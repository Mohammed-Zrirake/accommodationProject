import { useAuth, useSignUp, useUser } from "@clerk/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5073";

// The only roles a visitor can request are client and owner. Admin is dashboard-managed.
export default function RoleSignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [role, setRole] = useState("client");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const submit = async event => {
    event.preventDefault(); if (!isLoaded) return;
    setError("");
    try {
      await signUp.create({ username, emailAddress: email, password, unsafeMetadata: { role } });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerifying(true);
    } catch (exception) { setError(exception.errors?.[0]?.longMessage || "Could not create your account."); }
  };
  const verify = async event => {
    event.preventDefault(); setError("");
    try {
      const completed = await signUp.attemptEmailAddressVerification({ code });
      if (completed.status !== "complete") throw new Error("Verification is incomplete.");
      await setActive({ session: completed.createdSessionId });
      const template = import.meta.env.VITE_CLERK_JWT_TEMPLATE;
      const token = await getToken(template ? { template } : undefined);
      const response = await fetch(`${API_URL}/api/users/me/public-metadata`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role, username, email })
      });
      if (!response.ok) throw new Error((await response.text()) || "Could not set your account role.");
      await user?.reload();
      navigate(role === "owner" ? "/owner/properties" : "/");
    } catch (exception) { setError(exception.errors?.[0]?.longMessage || exception.message || "Verification failed."); }
  };
  return <main className="max-w-md mx-auto my-28 bg-white shadow-xl rounded-xl p-8">
    <h1 className="text-2xl font-semibold mb-5">Create your account</h1>
    <form className="space-y-4" onSubmit={verifying ? verify : submit}>
      {!verifying && <><label className="block">I want to <select value={role} onChange={e => setRole(e.target.value)} className="mt-1 w-full border rounded p-2"><option value="client">Book accommodations (Client)</option><option value="owner">List accommodations (Owner)</option></select></label><input required minLength="3" maxLength="100" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full border rounded p-2" /><input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded p-2" /><input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded p-2" /></>}
      {verifying && <input required placeholder="Email verification code" value={code} onChange={e => setCode(e.target.value)} className="w-full border rounded p-2" />}
      {error && <p className="text-red-600 text-sm">{error}</p>}<button className="w-full bg-black text-white rounded p-2">{verifying ? "Verify email" : "Continue"}</button>
    </form>
  </main>;
}
