import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Camera, User, MapPin, Phone, Mail, Calendar } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Fashion Street, New York, NY 10001",
    bio: "Fashion enthusiast with a passion for timeless style and quality craftsmanship.",
    joinDate: "2023-01-15"
  });

  const [orderHistory] = useState([
    {
      id: "ORD-001",
      date: "2024-01-15",
      total: 299.99,
      status: "Delivered",
      items: ["Elegant Silk Dress", "Designer Handbag"]
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      total: 449.99,
      status: "Shipped",
      items: ["Classic Leather Jacket"]
    },
    {
      id: "ORD-003",
      date: "2023-12-20",
      total: 189.99,
      status: "Delivered",
      items: ["Cashmere Sweater"]
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-4 md:inset-8 lg:inset-16 bg-background rounded-lg shadow-2xl overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6" />
              My Profile
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6 mt-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="text-xl">
                        {profileData.firstName[0]}{profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since {new Date(profileData.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        value={profileData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant="cart">
                    Save Changes
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-4 mt-6">
                <h4 className="text-lg font-semibold">Recent Orders</h4>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-semibold">{order.id}</h5>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <p className={`text-sm ${
                            order.status === 'Delivered' ? 'text-green-600' : 
                            order.status === 'Shipped' ? 'text-blue-600' : 'text-yellow-600'
                          }`}>
                            {order.status}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Items:</p>
                        <p className="text-sm">{order.items.join(", ")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6 mt-6">
                <h4 className="text-lg font-semibold">Shopping Preferences</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="size">Preferred Size</Label>
                    <Input id="size" placeholder="e.g., M, L, XL" />
                  </div>
                  <div>
                    <Label htmlFor="style">Style Preferences</Label>
                    <Textarea 
                      id="style" 
                      placeholder="Describe your favorite styles, colors, brands..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Email Notifications</Label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">New arrivals</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">Sales and promotions</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="text-sm">Style recommendations</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="cart">
                    Save Preferences
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;