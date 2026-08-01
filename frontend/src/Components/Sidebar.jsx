import React, { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore";
import SidebarSkeleton from "./Skeletons/SidebarSkeleton";
import { User, User2 } from "lucide-react";
import { userAuthStore } from "../Store/useAuthStore";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  console.log("Users:", users);
  console.log("Length:", users.length);

  const { onlineUsers } = userAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5 ">
        <div className="flex items-center gap-2">
          <User className="size-6 ml-2" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>
      <div className="overflow-y-auto w-full py-3 ">
        {users.map((user) => {
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors 
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={
                    user.profilePic ||
                    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>
              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.fullName}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
