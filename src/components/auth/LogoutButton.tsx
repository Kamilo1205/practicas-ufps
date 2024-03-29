'use client';

import { logout } from "@/actions";

export const LogoutButton = () => {
  return (
    <button 
        onClick={ () => logout()}
        className="rounded-sm bg-orange-700 text-white p-4"    
    >
        LogoutButton
    </button>
  );
}
