import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Chatbot } from "@/components/chatbot";
import { CompleteProfileModal } from "@/components/auth/complete-profile-modal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen text-foreground antialiased selection:bg-purple-500/30">
        {children}
      </main>
      <Footer />
      <Chatbot />
      <CompleteProfileModal />
    </>
  );
}
