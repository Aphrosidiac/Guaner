'use client';

import { useState } from 'react';
import { Search, Package } from 'lucide-react';
import { useTheme } from '../../_components/ThemedShell';
import { lookupOrders } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/constants';
import { Animate, Stagger } from '@/components/ui/Animate';
import type { Order } from '@/types';

export default function ThemedTrack() {
  const t = useTheme();
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const heading: React.CSSProperties = { fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    try {
      setOrders(await lookupOrders(phone.trim()));
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-6 py-16">
      <Animate variant="fadeUp" duration={0.6}>
        <div className="text-center mb-8">
          <Package className="w-10 h-10 mx-auto mb-4" style={{ color: t.textMuted }} />
          <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: t.accent }}>Order Status</p>
          <h1 className="text-4xl sm:text-5xl mb-3" style={heading}>Track Your Order</h1>
          <p style={{ color: t.textMuted }}>Enter the phone number you used when placing your order.</p>
        </div>
      </Animate>

      <Animate variant="fadeUp" delay={0.12} duration={0.5}>
        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: t.textMuted }} />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="012-3456789"
              className="w-full pl-10 pr-4 py-3 text-sm focus:outline-none"
              style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius, color: t.text }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 font-semibold text-sm transition-transform active:scale-95 disabled:opacity-50"
            style={{ background: t.primary, color: t.primaryText, borderRadius: t.radius, fontFamily: t.displayFont, textTransform: t.upper ? 'uppercase' : 'none' }}
          >
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>
      </Animate>

      {searched && orders !== null && (
        orders.length === 0 ? (
          <p className="text-center py-12" style={{ color: t.textMuted }}>No orders found for this phone number.</p>
        ) : (
          <Stagger className="space-y-4" stagger={0.08}>
            {orders.map((order) => (
              <div key={order.id} className="p-6" style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: t.radius }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold" style={{ fontFamily: t.displayFont }}>{order.orderNumber}</p>
                    <p className="text-sm" style={{ color: t.textMuted }}>{formatDate(order.createdAt)}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${ORDER_STATUS_COLORS[order.status]}`}>{ORDER_STATUS_LABELS[order.status]}</span>
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span style={{ color: t.textMuted }}>{item.product.name} &times;{item.quantity}</span>
                      <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 flex justify-between font-semibold" style={{ borderTop: `1px solid ${t.border}` }}>
                  <span>Total</span>
                  <span style={{ color: t.accent }}>{formatPrice(order.total)}</span>
                </div>
              </div>
            ))}
          </Stagger>
        )
      )}
    </section>
  );
}
