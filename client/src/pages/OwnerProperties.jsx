import { Link } from "react-router-dom";

// This is the owner-facing entry page copied into the client application so roles share one frontend.
export default function OwnerProperties() {
  return <main className="max-w-6xl mx-auto my-28 px-5"><div className="flex items-center justify-between"><div><h1 className="text-3xl font-semibold">My Properties</h1><p className="text-gray-600 mt-2">Manage your accommodation listings and units.</p></div><Link to="/owner/properties/add" className="bg-black text-white px-5 py-3 rounded-lg">Add property</Link></div><div className="mt-8 border rounded-xl p-8 text-gray-600">Your owner dashboard is ready. Add a property to begin managing listings.</div></main>;
}
