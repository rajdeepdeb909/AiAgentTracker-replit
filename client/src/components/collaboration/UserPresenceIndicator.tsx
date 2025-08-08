import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Users, Eye, Clock } from "lucide-react";
import type { UserPresence } from "@shared/collaboration-schema";
import { formatDistanceToNow } from "date-fns";

interface UserPresenceIndicatorProps {
  users: UserPresence[];
  currentUserId?: string;
  showDetails?: boolean;
  maxVisible?: number;
}

export function UserPresenceIndicator({ 
  users, 
  currentUserId, 
  showDetails = false,
  maxVisible = 5 
}: UserPresenceIndicatorProps) {
  const activeUsers = users.filter(user => user.isActive && user.userId !== currentUserId);
  const visibleUsers = activeUsers.slice(0, maxVisible);
  const remainingUsers = Math.max(0, activeUsers.length - maxVisible);

  if (activeUsers.length === 0) {
    return null;
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'ceo':
      case 'executive':
        return 'bg-purple-500';
      case 'coo':
      case 'cfo':
      case 'cto':
        return 'bg-blue-500';
      case 'cmo':
      case 'cro':
      case 'cpo':
        return 'bg-green-500';
      case 'cdo':
      case 'cao':
        return 'bg-orange-500';
      case 'manager':
        return 'bg-indigo-500';
      case 'analyst':
        return 'bg-teal-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!showDetails) {
    return (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-green-500" />
        <span className="text-sm text-muted-foreground">
          {activeUsers.length} user{activeUsers.length !== 1 ? 's' : ''} online
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Eye className="h-4 w-4 text-green-500" />
        <span className="text-sm font-medium text-green-600">
          {activeUsers.length} viewing
        </span>
      </div>
      
      <div className="flex items-center -space-x-2">
        {visibleUsers.map((user) => (
          <Tooltip key={user.userId}>
            <TooltipTrigger>
              <div className="relative">
                <Avatar className="h-8 w-8 border-2 border-background">
                  <AvatarFallback className={`text-white text-xs ${getRoleColor(user.userRole)}`}>
                    {getUserInitials(user.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="space-y-1">
                <div className="font-medium">{user.userName}</div>
                <Badge variant="secondary" className="text-xs">
                  {user.userRole}
                </Badge>
                {user.currentSection && (
                  <div className="text-xs text-muted-foreground">
                    Viewing: {user.currentSection}
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Active {formatDistanceToNow(new Date(user.lastActivity), { addSuffix: true })}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {remainingUsers > 0 && (
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted border-2 border-background text-xs font-medium">
                +{remainingUsers}
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <div className="text-sm">
                {remainingUsers} more user{remainingUsers !== 1 ? 's' : ''} online
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}