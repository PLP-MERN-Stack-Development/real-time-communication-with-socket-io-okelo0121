import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatArea from "@/components/chat/ChatArea";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        // Update user status to online
        updateUserStatus("online");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        updateUserStatus("online");
      }
    });

    // Update status to offline when user leaves
    const handleBeforeUnload = () => {
      if (session?.user) {
        updateUserStatus("offline");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (session?.user) {
        updateUserStatus("offline");
      }
    };
  }, [navigate]);

  const updateUserStatus = async (status: string) => {
    if (!session?.user) return;
    
    try {
      await supabase
        .from("profiles")
        .update({ 
          status,
          last_seen: new Date().toISOString()
        })
        .eq("id", session.user.id);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <ChatSidebar userId={session.user.id} />
      <ChatArea userId={session.user.id} />
    </div>
  );
};

export default Chat;