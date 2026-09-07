import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="mt-24 max-w-lg">
        <h1 className="text-4xl font-bold text-white">Welcome,</h1>
        <p className="mt-3 text-xl text-white">
          This is where your contacts will live. Click the button below to add a new contact.
        </p>

        <button
          onClick={() => navigate('/contacts/new')}
          className="mt-8 rounded-full border border-white bg-transparent px-6 py-2 font-medium text-white transition hover:bg-white/10"
        >
          add your first contact
        </button>

      </div>
    </AppLayout>
  );
}