import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LogOut, Plus, Hash, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ChatSidebar = ({ userId }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    loadRooms();
    loadProfile();
    subscribeToRooms();
  }, [userId]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    
    if (data) setCurrentProfile(data);
  };

  const loadRooms = async () => {
    const { data } = await supabase
      .from("chat_rooms")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) {
      setRooms(data);
      if (data.length > 0 && !selectedRoom) {
        setSelectedRoom(data[0].id);
        joinRoom(data[0].id);
      }
    }
  };

  const subscribeToRooms = () => {
    const channel = supabase
      .channel("chat_rooms_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chat_rooms",
        },
        () => {
          loadRooms();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const joinRoom = async (roomId) => {
    const { error } = await supabase
      .from("room_members")
      .upsert({ room_id: roomId, user_id: userId }, { onConflict: "room_id,user_id" });

    if (error && error.code !== "23505") {
      console.error("Error joining room:", error);
    }
  };

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
    joinRoom(roomId);
    // Dispatch custom event to notify ChatArea
    window.dispatchEvent(
      new CustomEvent("roomSelected", { detail: { roomId } })
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
  };

  return (
    <div className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-sidebar-primary/10 rounded-lg">
            <MessageSquare className="w-6 h-6 text-sidebar-primary" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground">ChatApp</h1>
        </div>
        {currentProfile && (
          <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {currentProfile.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sidebar-foreground truncate">
                {currentProfile.username}
              </p>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${
                  currentProfile.status === "online" 
                    ? "bg-[hsl(var(--online-status))]" 
                    : "bg-muted-foreground"
                }`} />
                <p className="text-xs text-sidebar-foreground/70 capitalize">
                  {currentProfile.status}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between px-3 mb-2">
            <h2 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
              Channels
            </h2>
          </div>
          {rooms.map((room) => (
            <Button
              key={room.id}
              variant={selectedRoom === room.id ? "secondary" : "ghost"}
              className={`w-full justify-start gap-2 ${
                selectedRoom === room.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
              onClick={() => handleRoomSelect(room.id)}
            >
              <Hash className="w-4 h-4" />
              <span className="truncate">{room.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;