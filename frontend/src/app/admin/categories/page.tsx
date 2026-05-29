'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, X, Trash2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  adminGetCategories,
  adminCreateCategory,
  adminUpdateCategory,
  adminDeleteCategory,
  type AdminCategory,
} from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  sortOrder: string;
}
const emptyForm: FormData = { name: '', slug: '', description: '', sortOrder: '0' };

function errMessage(err: unknown): string | undefined {
  return err && typeof err === 'object' && 'response' in err
    ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
    : undefined;
}

export default function AdminCategoriesPage() {
  const { token } = useAuth();
  const [cats, setCats] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const load = () => {
    if (!token) return;
    adminGetCategories(token).then(setCats).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [token]);

  const openCreate = () => { setEditingId(null); setForm(emptyForm); setFormError(''); setShowModal(true); };
  const openEdit = (c: AdminCategory) => {
    setEditingId(c.id);
    setForm({ name: c.name, slug: c.slug, description: c.description ?? '', sortOrder: String(c.sortOrder) });
    setFormError('');
    setShowModal(true);
  };

  const update = (k: keyof FormData, v: string) =>
    setForm((f) => {
      const u = { ...f, [k]: v };
      if (k === 'name' && !editingId) u.slug = slugify(v);
      return u;
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    setFormError('');
    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      description: form.description || null,
      sortOrder: parseInt(form.sortOrder) || 0,
    };
    try {
      if (editingId) await adminUpdateCategory(token, editingId, payload);
      else await adminCreateCategory(token, payload);
      setShowModal(false);
      load();
    } catch (err) {
      setFormError(errMessage(err) || 'Failed to save collection');
    } finally {
      setSaving(false);
    }
  };

  const del = async (c: AdminCategory) => {
    if (!token || !confirm(`Delete collection "${c.name}"?`)) return;
    try {
      await adminDeleteCategory(token, c.id);
      load();
    } catch (err) {
      alert(errMessage(err) || 'Failed to delete collection');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold">Collections</h1>
          <p className="text-sm text-text-secondary mt-1">Categories shown across the storefront (Shop filters, Collections page).</p>
        </div>
        <Button onClick={openCreate}><Plus className="w-4 h-4" /> Add Collection</Button>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-2">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-14 bg-surface-elevated rounded" />)}</div>
      ) : cats.length === 0 ? (
        <p className="text-text-muted py-8 text-center">No collections yet.</p>
      ) : (
        <div className="bg-surface rounded-xl border border-border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-elevated">
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Order</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Name</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Slug</th>
                <th className="text-left px-4 py-3 font-medium text-text-secondary">Description</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">Products</th>
                <th className="text-center px-4 py-3 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-surface-elevated/50">
                  <td className="px-4 py-3 text-text-muted tabular-nums">{c.sortOrder}</td>
                  <td className="px-4 py-3 font-medium">{c.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">{c.slug}</td>
                  <td className="px-4 py-3 text-text-secondary max-w-xs truncate">{c.description || '—'}</td>
                  <td className="px-4 py-3 text-center text-text-secondary">{c.productCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEdit(c)} className="p-1.5 hover:bg-surface-elevated rounded cursor-pointer" title="Edit">
                        <Pencil className="w-4 h-4 text-text-muted" />
                      </button>
                      <button onClick={() => del(c)} className="p-1.5 hover:bg-red-50 rounded cursor-pointer" title="Delete">
                        <Trash2 className="w-4 h-4 text-text-muted hover:text-danger" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface rounded-xl border border-border w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display font-semibold text-lg">{editingId ? 'Edit Collection' : 'Add Collection'}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-surface-elevated rounded cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={submit} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Name" id="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. T-Shirts" required />
                <Input label="URL Slug" id="slug" value={form.slug} onChange={(e) => update('slug', e.target.value)} placeholder="auto-generated" required />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Short blurb shown on the Collections page…"
                />
              </div>
              <Input label="Sort Order" id="sortOrder" type="number" value={form.sortOrder} onChange={(e) => update('sortOrder', e.target.value)} placeholder="0" />
              {formError && <p className="text-sm text-danger">{formError}</p>}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                <Button type="submit" disabled={saving}>{saving ? 'Saving…' : editingId ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
