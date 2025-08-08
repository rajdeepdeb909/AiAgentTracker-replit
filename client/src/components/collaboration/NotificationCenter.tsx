import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Bell, Check, Trash2, User, Clock } from "lucide-react";
import type { CollaborationNotification } from "@shared/collaboration-schema";
import { formatDistanceToNow } from "date-fns";

interface NotificationCenterProps {
  notifications: CollaborationNotification[];
  unreadCount: number;
  onMarkAsRead: (notificationIds?: number[]) => void;
}

export function NotificationCenter({ 
  notifications, 
  unreadCount, 
  onMarkAsRead 
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'join':
        return <User className="h-4 w-4 text-green-500" />;
      case 'leave':
        return <User className="h-4 w-4 text-gray-500" />;
      case 'edit':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'comment':
        return <Bell className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleMarkAllAsRead = () => {
    onMarkAsRead();
  };

  const handleMarkAsRead = (notificationId: number) => {
    onMarkAsRead([notificationId]);
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead).slice(0, 10);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleMarkAllAsRead}
                className="text-xs"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="space-y-0">
              {/* Unread notifications */}
              {unreadNotifications.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-muted/50">
                    <span className="text-xs font-medium text-muted-foreground">
                      UNREAD ({unreadNotifications.length})
                    </span>
                  </div>
                  
                  {unreadNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:bg-muted/50 border-l-2 border-l-blue-500 bg-blue-50/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.notificationType)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {notification.senderName}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {notification.notificationType}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                            </span>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                              className="text-xs h-6 px-2"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Read notifications */}
              {readNotifications.length > 0 && (
                <>
                  {unreadNotifications.length > 0 && <Separator />}
                  
                  <div className="px-4 py-2 bg-muted/30">
                    <span className="text-xs font-medium text-muted-foreground">
                      RECENT
                    </span>
                  </div>
                  
                  {readNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:bg-muted/30 opacity-60"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.notificationType)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {notification.senderName}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {notification.notificationType}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-1">
                            {notification.message}
                          </p>
                          
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}