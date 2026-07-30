'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useOutlet } from '@/context/OutletContext';
import { reservationSchema, ReservationFormData } from '@/libs/schemas/reservation.schema';
import { reservationService } from '@/api/services/reservation.service';
import FormField from '@/components/forms/FormField';
import Button from '@/components/ui/button';
import {
  MapPin,
  ChevronRight,
  Calendar,
  Users,
  Clock,
  Search,
  X,
  CheckCircle2,
  ShieldCheck,
  Zap,
  XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VendorBranch } from "@/types";

// Pre-defined time slots
const TIME_SLOTS = [
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '06:00 PM',
  '06:30 PM',
  '07:00 PM',
  '07:30 PM',
  '08:00 PM',
  '08:30 PM',
  '09:00 PM',
];

export default function ChooseOutlet() {
  const { outlets, selectedOutlet, setSelectedOutlet } = useOutlet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    mode: 'onChange',
    defaultValues: {
      branch_id: selectedOutlet?.id || '',
      name: '',
      email: '',
      phone: '',
      guests: 2,
      date: new Date().toISOString().split('T')[0],
      time: '07:00 PM',
      special_requests: '',
    },
  });

  // Filtered outlets based on search string
  const filteredOutlets = useMemo(() => {
    if (!searchQuery.trim()) return outlets;
    const q = searchQuery.toLowerCase().trim();
    return outlets.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        (o.address && o.address.toLowerCase().includes(q)) ||
        (o.country?.name && o.country.name.toLowerCase().includes(q))
    );
  }, [outlets, searchQuery]);

  const handleSelectOutlet = (outlet: VendorBranch) => {
    setSelectedOutlet(outlet);
    setValue('branch_id', outlet.id, { shouldValidate: true });
    setIsModalOpen(false);
  };

  const mutation = useMutation({
    mutationFn: (data: ReservationFormData) => reservationService.makeReservation(data),
    onSuccess: () => {
      reset({
        branch_id: selectedOutlet?.id || '',
        name: '',
        email: '',
        phone: '',
        guests: 2,
        date: new Date().toISOString().split('T')[0],
        time: '07:00 PM',
        special_requests: '',
      });
    },
  });

  const onSubmit = useCallback(
    (data: ReservationFormData) => {
      mutation.mutate(data);
    },
    [mutation]
  );

  return (
    <div className=" bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden">
      {/* 1. TOP RED HEADER SECTION (Matching screenshot) */}
      <div className="bg-[#C4010F] text-white p-6 sm:p-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-200">
            GET STARTED
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            Where would you like to dine?
          </h2>
        </div>

        {/* Location Chooser Button */}
        <div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-[#C4010F] hover:bg-gray-100 px-5 py-3 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <MapPin className="w-4 h-4 text-[#C4010F] shrink-0" />
            <span className="truncate max-w-[240px] sm:max-w-[320px]">
              {selectedOutlet ? selectedOutlet.name : 'Choose a Location'}
            </span>
            <ChevronRight className="w-4 h-4 text-[#C4010F] shrink-0" />
          </button>
        </div>
      </div>

      {/* 2. CARD BODY */}
      <div className="p-6 sm:p-8">
        {!selectedOutlet ? (
          /* STATE A: NO LOCATION CHOSEN (Matches screenshot empty state) */
          <div className="flex flex-col gap-6">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-10 sm:p-14 flex flex-col items-center justify-center text-center gap-3 bg-gray-50/50">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[#C4010F]">
                <MapPin className="w-6 h-6 fill-current text-[#C4010F]" />
              </div>
              <p className="text-gray-600 font-bold text-base">Select a location above</p>
              <p className="text-gray-400 text-xs max-w-xs">
                To unlock table availability and fill in your reservation details
              </p>
            </div>

            {/* Disabled Action Button */}
            <button
              disabled
              className="w-full py-4 rounded-xl bg-gray-100 text-gray-400 font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200"
            >
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Choose a Location First</span>
            </button>
          </div>
        ) : (
          /* STATE B: UNLOCKED RESERVATION FORM */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            

            {/* Contact Person Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                label="Full Name *"
                placeholder="e.g. Rajesh Sharma"
                registration={register('name')}
                error={errors.name?.message}
              />
              <FormField
                label="Phone Number *"
                placeholder="e.g. +977 9801234567"
                registration={register('phone')}
                error={errors.phone?.message}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                type="email"
                label="Email Address *"
                placeholder="e.g. rajesh@example.com"
                registration={register('email')}
                error={errors.email?.message}
              />

              {/* Number of Guests Input Field */}
              <FormField
                type="number"
                label="Number of Guests *"
                placeholder="Enter guest count (e.g. 4)"
                registration={register('guests', { valueAsNumber: true })}
                error={errors.guests?.message}
              />
            </div>

            {/* Date & Time Selector */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C4010F]" />
                  <span>Reservation Date *</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium outline-none focus:border-[#C4010F] focus:bg-white focus:ring-4 focus:ring-[#C4010F]/10"
                  {...register('date')}
                />
                {errors.date?.message && (
                  <span className="text-xs text-red-600 font-semibold">{errors.date.message}</span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C4010F]" />
                  <span>Preferred Time Slot *</span>
                </label>
                <select
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-medium outline-none focus:border-[#C4010F] focus:bg-white focus:ring-4 focus:ring-[#C4010F]/10"
                  {...register('time')}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                {errors.time?.message && (
                  <span className="text-xs text-red-600 font-semibold">{errors.time.message}</span>
                )}
              </div>
            </div>

            {/* Special Requests */}
            <FormField
              isTextArea
              rows={3}
              label="Special Requests (Optional)"
              placeholder="Allergies, high chair, birthday celebration, seating preference..."
              registration={register('special_requests')}
            />

            {/* Mutation Messages */}
            {mutation.isSuccess && (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span>{mutation.data?.message || 'Table reservation confirmed!'}</span>
              </div>
            )}

            {mutation.isError && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold animate-in fade-in">
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : 'Something went wrong. Please check your details.'}
              </div>
            )}

            {/* Submit Action */}
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-[#C4010F] hover:bg-[#a6000c] text-white py-4 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all disabled:opacity-50"
            >
              {mutation.isPending
                ? 'Confirming Reservation...'
                : `Confirm Table at ${selectedOutlet.name}`}
            </Button>
          </form>
        )}

        {/* 3. CARD FOOTER TRUST BADGES (Matching screenshot) */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-gray-500">
          <div className="flex items-center gap-1.5 text-gray-700">
            <ShieldCheck className="w-4 h-4 text-[#C4010F]" />
            <span>Secure</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700">
            <Zap className="w-4 h-4 text-red-600" />
            <span>Instant confirm</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-700">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>Free cancel</span>
          </div>
        </div>
      </div>

      {/* 4. LOCATION SELECTION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Select Dining Outlet</h3>
                  <p className="text-xs text-gray-500">Choose your preferred Bajeko Sekuwa branch</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Search Bar */}
              <div className="p-4 bg-gray-50 border-b border-gray-100">
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by outlet name, address, city..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-[#C4010F] focus:ring-2 focus:ring-[#C4010F]/10"
                  />
                </div>
              </div>

              {/* Outlet Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-gray-50">
                {filteredOutlets.length === 0 ? (
                  <p className="text-center text-gray-400 text-sm py-8">
                    No outlets found matching "{searchQuery}"
                  </p>
                ) : (
                  filteredOutlets.map((outlet) => {
                    const isSelected = selectedOutlet?.id === outlet.id;
                    return (
                      <button
                        key={outlet.id}
                        type="button"
                        onClick={() => handleSelectOutlet(outlet)}
                        className={`w-full p-4 rounded-lg text-left flex items-center justify-between transition-all pt-3 ${
                          isSelected
                            ? 'bg-red-50/70 border border-[#C4010F]/30'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-base">{outlet.name}</span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                outlet.open
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              {outlet.open ? 'Open' : 'Closed'}
                            </span>
                          </div>
                          {outlet.address && (
                            <p className="text-xs text-gray-500 line-clamp-1">{outlet.address}</p>
                          )}
                        </div>

                        <div className="shrink-0">
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-[#C4010F]" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
