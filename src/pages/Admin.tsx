import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DbProduct {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  category: string;
  image_url: string | null;
  description: string | null;
  sizes: string[];
  colors: string[];
  is_on_sale: boolean;
  stock: number;
  created_at: string;
}

const Admin = () => {
  const { user, loading: userLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [items, setItems] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [isOnSale, setIsOnSale] = useState(false);
  const [stock, setStock] = useState<string>("0");

  useEffect(() => {
    document.title = "Admin - Manage Products | VELVERRA";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Admin dashboard to add, edit, and delete store products with stock management.');
  }, []);

  useEffect(() => {
    if (!userLoading && !roleLoading) {
      if (!user || !isAdmin) {
        toast({ title: "Access denied", description: "Admin access required.", variant: "destructive" });
        navigate("/");
      }
    }
  }, [user, isAdmin, userLoading, roleLoading, navigate, toast]);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setOriginalPrice("");
    setCategory("");
    setImageUrl("");
    setDescription("");
    setSizes("");
    setColors("");
    setIsOnSale(false);
    setStock("0");
  };

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to load products", variant: "destructive" });
    } else {
      setItems((data as DbProduct[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && isAdmin) {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isAdmin]);

  const onEdit = (p: DbProduct) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(String(p.price));
    setOriginalPrice(p.original_price != null ? String(p.original_price) : "");
    setCategory(p.category);
    setImageUrl(p.image_url || "");
    setDescription(p.description || "");
    setSizes(p.sizes?.join(", ") || "");
    setColors(p.colors?.join(", ") || "");
    setIsOnSale(!!p.is_on_sale);
    setStock(String(p.stock));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Product removed." });
      loadProducts();
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: name.trim(),
      price: Number(price),
      original_price: originalPrice ? Number(originalPrice) : null,
      category: category.trim(),
      image_url: imageUrl.trim() || null,
      description: description.trim() || null,
      sizes: sizes ? sizes.split(",").map(s => s.trim()).filter(Boolean) : [],
      colors: colors ? colors.split(",").map(s => s.trim()).filter(Boolean) : [],
      is_on_sale: isOnSale,
      stock: Number(stock || 0),
    } as const;

    let error;
    if (editingId) {
      ({ error } = await supabase.from("products").update(payload as any).eq("id", editingId));
    } else {
      ({ error } = await supabase.from("products").insert(payload as any));
    }

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: `Product ${editingId ? "updated" : "created"}.` });
      resetForm();
      loadProducts();
    }
    setSaving(false);
  };

  if (userLoading || roleLoading || (!user || !isAdmin)) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Admin</h1>
        <p className="text-muted-foreground">Loading...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin - Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Product" : "Add New Product"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Price</label>
                  <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm mb-1">Original Price</label>
                  <Input type="number" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <Input placeholder="Women’s Clothing, Men’s Clothing, Accessories, Makeup..." value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm mb-1">Image URL</label>
                <Input placeholder="https://..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">Sizes (comma separated)</label>
                  <Input value={sizes} onChange={(e) => setSizes(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm mb-1">Colors (comma separated)</label>
                  <Input value={colors} onChange={(e) => setColors(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input id="ison" type="checkbox" checked={isOnSale} onChange={(e) => setIsOnSale(e.target.checked)} />
                  <label htmlFor="ison" className="text-sm">On Sale</label>
                </div>
                <div>
                  <label className="block text-sm mb-1">Stock</label>
                  <Input type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={saving}>{saving ? "Saving..." : (editingId ? "Update" : "Create")}</Button>
                {editingId && (
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : items.length === 0 ? (
              <p className="text-muted-foreground">No products yet.</p>
            ) : (
              <div className="w-full overflow-auto">
                <Table>
                  <TableCaption>Manage your store catalog</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell>${Number(p.price).toFixed(2)}</TableCell>
                        <TableCell>{p.stock}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline" onClick={() => onEdit(p)}>Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => onDelete(p.id)}>Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Admin;
