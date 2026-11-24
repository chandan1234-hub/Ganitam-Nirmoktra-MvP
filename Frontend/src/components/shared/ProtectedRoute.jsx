import { SignIn, useAuth } from "@clerk/react";
import "./ProtectedRoute.css";
import PageLoader from "./PageLoader.jsx";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <PageLoader />;

  if (!isSignedIn) {
    return (
      <main className="protected-route">
        <SignIn
          routing="hash"
          forceRedirectUrl="/chat"
          appearance={{
            variables: {
              colorPrimary: "#60a5fa",
              colorBackground: "#09090b",
              colorText: "#f4f4f5",
              colorInputBackground: "#18181b",
              colorInputText: "#f4f4f5",
            },
            elements: {
              rootBox: "w-full max-w-[25rem]",
              card: "w-full border border-white/10 bg-zinc-950 text-zinc-100 shadow-xl",
              headerTitle: "!text-zinc-100",
              headerSubtitle: "!text-zinc-300",
              formFieldLabel: "!text-zinc-200",
              socialButtonsBlockButton: "!border-white/10 !bg-zinc-900",
              socialButtonsBlockButtonText: "!text-zinc-100",
              dividerText: "!text-zinc-400",
              formFieldAction: "!text-blue-300",
              footerActionText: "!text-zinc-300",
              footerActionLink: "!text-blue-300",
            },
          }}
        />
      </main>
    );
  }

  return children;
};

export default ProtectedRoute;
