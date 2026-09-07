import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import AppLayout from '../components/AppLayout';
import Modal from '../components/Modal';
import Avatar from '../components/Avatar';
import { api } from '../lib/api';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  gender?: string | null;
}

export default function Contacts() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Contact>>({});
  const [deleteTarget, setDeleteTarget] = useState<Contact | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);

  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => (await api.get('/contacts')).data,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Contact> }) =>
      api.put(`/contacts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setEditingId(null);
      setShowSaved(true);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => api.delete(`/contacts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setDeleteTarget(null);
      setShowDeleted(true);
    },
  });

  const startEdit = (contact: Contact) => {
    setEditingId(contact.id);
    setEditForm(contact);
  };

  const saveEdit = () => {
    if (editingId == null) return;
    updateMutation.mutate({ id: editingId, data: editForm });
  };

  return (
    <AppLayout>
      <div className="w-full max-w-5xl text-left">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Contacts</h1>
          <button
            onClick={() => navigate('/contacts/new')}
            className="rounded-full border border-white px-5 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            add new contact
          </button>
        </div>

<div className="max-h-[55vh] overflow-y-auto rounded-2xl bg-white text-gray-800 shadow-xl">
  <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-teal-800">
                <th className="px-6 py-4 font-semibold"></th>
                <th className="px-2 py-4 font-semibold">full name</th>
                <th className="px-2 py-4 font-semibold">gender</th>
                <th className="px-2 py-4 font-semibold">e-mail</th>
                <th className="px-2 py-4 font-semibold">phone number</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-center text-gray-400">
                    Loading contacts...
                  </td>
                </tr>
              )}

              {contacts?.map((contact) => {
                const isEditing = editingId === contact.id;
                return (
                  <tr key={contact.id} className="border-t border-gray-100">
                    <td className="px-6 py-3">
                      <Avatar name={contact.name} />
                    </td>
                    <td className="px-2 py-3">
                      {isEditing ? (
                        <input
                          value={editForm.name ?? ''}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full rounded border border-gray-300 px-2 py-1"
                        />
                      ) : (
                        contact.name
                      )}
                    </td>
                    <td className="px-2 py-3">{contact.gender ?? '-'}</td>
                    <td className="px-2 py-3">
                      {isEditing ? (
                        <input
                          value={editForm.email ?? ''}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full rounded border border-gray-300 px-2 py-1"
                        />
                      ) : (
                        contact.email
                      )}
                    </td>
                    <td className="px-2 py-3">
                      {isEditing ? (
                        <input
                          value={editForm.phone ?? ''}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full rounded border border-gray-300 px-2 py-1"
                        />
                      ) : (
                        contact.phone
                      )}
                    </td>
                    <td className="px-6 py-3 text-right">
                      {isEditing ? (
                        <button
                          onClick={saveEdit}
                          disabled={updateMutation.isPending}
                          className="rounded-full bg-teal-800 px-4 py-1.5 text-xs font-medium text-white hover:bg-teal-900 disabled:opacity-50"
                        >
                          save
                        </button>
                      ) : (
                        <div className="flex items-center justify-end gap-3">
                          <button onClick={() => startEdit(contact)} className="text-gray-400 hover:text-teal-800">
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => setDeleteTarget(contact)} className="text-gray-400 hover:text-red-600">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Success: Saved */}
      <Modal isOpen={showSaved} onClose={() => setShowSaved(false)}>
        <p className="text-lg font-medium text-teal-900">Your contact has been saved successfully!</p>
        <button
          onClick={() => setShowSaved(false)}
          className="mt-5 rounded-full bg-teal-800 px-8 py-2 text-sm font-medium text-white hover:bg-teal-900"
        >
          Okay
        </button>
      </Modal>

      {/* Confirm: Delete */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <p className="text-lg font-medium text-teal-900">
          Do you want to delete the contact "{deleteTarget?.name}"?
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <button
            onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
            disabled={deleteMutation.isPending}
            className="rounded-full bg-teal-800 px-6 py-2 text-sm font-medium text-white hover:bg-teal-900 disabled:opacity-50"
          >
            Yes
          </button>
          <button
            onClick={() => setDeleteTarget(null)}
            className="rounded-full border border-teal-800 px-6 py-2 text-sm font-medium text-teal-800 hover:bg-teal-50"
          >
            Cancel
          </button>
        </div>
      </Modal>

      {/* Success: Deleted */}
      <Modal isOpen={showDeleted} onClose={() => setShowDeleted(false)}>
        <p className="text-lg font-medium text-teal-900">Your contact has been deleted successfully!</p>
        <button
          onClick={() => setShowDeleted(false)}
          className="mt-5 rounded-full bg-teal-800 px-8 py-2 text-sm font-medium text-white hover:bg-teal-900"
        >
          Okay
        </button>
      </Modal>
    </AppLayout>
  );
}