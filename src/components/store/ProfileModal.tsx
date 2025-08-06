import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Camera, User, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [profileData, setProfileData] = useState({
    display_name: "",
    email: "",
    avatar_url: "",
    pincode: "",
    home_phone: "",
    work_phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "India"
  });
  const [loading, setLoading] = useState(false);

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

  // Load profile data when modal opens
  useEffect(() => {
    if (isOpen && user) {
      loadProfile();
    }
  }, [isOpen, user]);

  const loadProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setProfileData({
          display_name: data.display_name || "",
          email: data.email || user.email || "",
          avatar_url: data.avatar_url || "",
          pincode: data.pincode || "",
          home_phone: data.home_phone || "",
          work_phone: data.work_phone || "",
          address_line1: data.address_line1 || "",
          address_line2: data.address_line2 || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "India"
        });
        setAvatarPreview(data.avatar_url || "");
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    // For now, we'll create a blob URL as a placeholder
    // In a real app, you'd upload to Supabase Storage
    return URL.createObjectURL(file);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let updatedData = { ...profileData };
      
      // Upload avatar if selected
      if (avatarFile) {
        const avatarUrl = await uploadAvatar(avatarFile);
        updatedData.avatar_url = avatarUrl;
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updatedData,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving profile:', error);
        toast.error('Failed to save profile');
        return;
      }

      toast.success('Profile saved successfully');
      setAvatarFile(null);
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
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
                      <AvatarImage src={avatarPreview || profileData.avatar_url || "/placeholder-avatar.jpg"} />
                      <AvatarFallback className="text-xl">
                        {profileData.display_name ? profileData.display_name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {profileData.display_name || 'Your Name'}
                    </h3>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Recently'}
                    </p>
                    {avatarPreview && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setAvatarFile(null);
                          setAvatarPreview("");
                        }}
                        className="text-xs mt-1"
                      >
                        Remove Photo
                      </Button>
                    )}
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="display_name">Display Name</Label>
                      <Input
                        id="display_name"
                        value={profileData.display_name}
                        onChange={(e) => handleInputChange("display_name", e.target.value)}
                        placeholder="Your full name"
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
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="home_phone">Home Phone</Label>
                      <Input
                        id="home_phone"
                        value={profileData.home_phone}
                        onChange={(e) => handleInputChange("home_phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <Label htmlFor="work_phone">Work Phone</Label>
                      <Input
                        id="work_phone"
                        value={profileData.work_phone}
                        onChange={(e) => handleInputChange("work_phone", e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Address Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address_line1">Address Line 1</Label>
                      <Input
                        id="address_line1"
                        value={profileData.address_line1}
                        onChange={(e) => handleInputChange("address_line1", e.target.value)}
                        placeholder="House/Flat No, Building Name"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address_line2">Address Line 2</Label>
                      <Input
                        id="address_line2"
                        value={profileData.address_line2}
                        onChange={(e) => handleInputChange("address_line2", e.target.value)}
                        placeholder="Street, Area, Landmark (Optional)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={profileData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={profileData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        placeholder="6-digit pincode"
                        maxLength={6}
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={profileData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={onClose} disabled={loading}>
                    Cancel
                  </Button>
                  <Button variant="cart" onClick={handleSaveProfile} disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
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