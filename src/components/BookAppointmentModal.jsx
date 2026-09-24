import React, { useEffect, useState } from 'react';
// Direct service import - No extra controller layer
import { getAvailability, bookAppointment } from '../controllers/bookappointment/appointmentbookingcontroller';

const DOCTOR_ID = 1;
const DOCTOR_NAME = 'Dr. Rafya';
const DOCTOR_SPECIALTY = 'Consultant Gynaecologist';
const CLINIC_ID = 1;

const REASON_SUGGESTIONS = [
  'Antenatal Checkup',
  'Ultrasound',
  'Consultation',
  'Follow-up Visit',
];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

const AppointmentBookingForm = ({ onSuccess }) => {
  const [date, setDate] = useState(todayIso());
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [slotWarning, setSlotWarning] = useState('');

  // Fetch slots directly from service
  useEffect(() => {
    if (!date) return;
    let ignore = false;

    const loadSlots = async () => {
      setSlotsLoading(true);
      setSlotsError('');
      setSelectedSlot(null);
      try {
        const resData = await getAvailability(DOCTOR_ID, date);
        const availableSlots = resData?.slots || resData?.data?.slots || [];
        
        if (!ignore) {
          setSlots(availableSlots);
        }
      } catch (err) {
        if (!ignore) {
          setSlots([]);
          setSlotsError(
            err.response?.data?.message || 'Could not load available slots.'
          );
        }
      } finally {
        if (!ignore) setSlotsLoading(false);
      }
    };

    loadSlots();
    return () => {
      ignore = true;
    };
  }, [date]);

  const chooseSlot = (slot) => {
    setSelectedSlot(slot);
    setSlotWarning('');
    setStatus({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot) {
      setSlotWarning('Please pick a time slot first.');
      return;
    }

    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const data = await bookAppointment({
        clinic_id: CLINIC_ID,
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        doctor_id: DOCTOR_ID,
        treatment_id: null,
        starts_at: selectedSlot.starts_at,
        ends_at: selectedSlot.ends_at,
        reason,
        notes,
        source: 'website',
      });

      setStatus({
        type: 'success',
        text: data.message || 'Appointment successfully scheduled!',
      });

      setSlots((prev) => prev.filter((s) => s.starts_at !== selectedSlot.starts_at));
      setSelectedSlot(null);
      setFirstName('');
      setLastName('');
      setPhone('');
      setEmail('');
      setReason('');
      setNotes('');

      if (onSuccess) onSuccess(data.data);
    } catch (err) {
      if (err.response?.status === 409) {
        setSlots((prev) => prev.filter((s) => s.starts_at !== selectedSlot.starts_at));
        setSelectedSlot(null);
      }
      setStatus({
        type: 'error',
        text: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F7FA] via-[#F3F1F6] to-[#EAE5F2] p-4 sm:p-6 lg:p-8 font-sans">
      <div className="mt-8 mb-8 w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-[32px] shadow-[0_24px_70px_-12px_rgba(75,59,107,0.18)] border border-white/80 overflow-hidden transition-all duration-300">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#9d5f79] to-[#F28BB6] px-8 pt-8 pb-7 text-white">
          {/* Subtle Glow & Pattern elements */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-[#F28BB6]/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] bg-white/10 backdrop-blur-md rounded-full text-[#ffffff] border border-white/10">
              {DOCTOR_SPECIALTY}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Book Appointment with {DOCTOR_NAME}
            </h1>
            <p className="text-sm text-[#E4E0EC] leading-relaxed max-w-xl">
              Secure your visit in just a few clicks. Select your preferred date, choose a convenient time slot, and fill in your details below.
            </p>
          </div>
        </div>

        {/* Body Section */}
        <div className="px-6 sm:px-8 py-8">
          {status.text && (
            <div
              className={`p-4 mb-6 text-sm rounded-2xl border flex items-start gap-3 transition-all animate-fadeIn ${
                status.type === 'success'
                  ? 'bg-[#EAF5F0] text-[#1F6B4E] border-[#BFE3D2]'
                  : 'bg-[#FBEAE6] text-[#B3402A] border-[#F3C8BC]'
              }`}
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-white shadow-sm mt-0.5 text-xs font-bold">
                {status.type === 'success' ? '✓' : '!'}
              </span>
              <span className="leading-relaxed">{status.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Patient Information Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[#4B3B6B] uppercase tracking-[0.15em]">
                Patient Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6578] uppercase tracking-[0.1em] mb-1.5">
                    First Name <span className="text-[#B3402A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#F8F7FA] border border-[#E4E0EC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B3B6B] focus:bg-white focus:ring-4 focus:ring-[#4B3B6B]/10 transition-all text-[#211F2E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6578] uppercase tracking-[0.1em] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Khan"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#F8F7FA] border border-[#E4E0EC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B3B6B] focus:bg-white focus:ring-4 focus:ring-[#4B3B6B]/10 transition-all text-[#211F2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6578] uppercase tracking-[0.1em] mb-1.5">
                    Phone Number <span className="text-[#B3402A]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8F7FA] border border-[#E4E0EC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B3B6B] focus:bg-white focus:ring-4 focus:ring-[#4B3B6B]/10 transition-all text-[#211F2E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#6B6578] uppercase tracking-[0.1em] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ayesha@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8F7FA] border border-[#E4E0EC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B3B6B] focus:bg-white focus:ring-4 focus:ring-[#4B3B6B]/10 transition-all text-[#211F2E]"
                  />
                </div>
              </div>
            </div>

            <hr className="border-[#E4E0EC]/60" />

            {/* Date Input */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4B3B6B] uppercase tracking-[0.15em] mb-2">
                Select Date <span className="text-[#B3402A]">*</span>
              </label>
              <input
                type="date"
                value={date}
                min={todayIso()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#F8F7FA] border border-[#E4E0EC] rounded-xl px-4 py-3 text-sm font-mono text-[#211F2E] focus:outline-none focus:border-[#4B3B6B] focus:bg-white focus:ring-4 focus:ring-[#4B3B6B]/10 transition-all shadow-sm"
              />
            </div>

            {/* Time Slots Grid */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[11px] font-semibold text-[#4B3B6B] uppercase tracking-[0.15em]">
                  Available Slots <span className="text-[#B3402A]">*</span>
                </label>
                {selectedSlot && (
                  <span className="text-xs text-[#F28BB6] font-semibold font-mono bg-[#F28BB6]/10 px-2.5 py-0.5 rounded-full">
                    Selected: {selectedSlot.label}
                  </span>
                )}
              </div>

              {slotsLoading && (
                <div className="grid grid-cols-3 gap-2.5">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-11 rounded-xl bg-[#F0EDF6] animate-pulse" />
                  ))}
                </div>
              )}

              {!slotsLoading && slotsError && (
                <p className="text-sm text-[#B3402A] bg-[#FBEAE6] border border-[#F3C8BC] rounded-xl px-4 py-3">
                  {slotsError}
                </p>
              )}

              {!slotsLoading && !slotsError && slots.length === 0 && (
                <p className="text-sm text-[#6B6578] bg-[#F8F7FA] border border-[#E4E0EC] rounded-xl px-4 py-3 text-center">
                  No open slots on this date. Please try another day.
                </p>
              )}

              {!slotsLoading && !slotsError && slots.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-52 overflow-y-auto pr-1">
                  {slots.map((slot) => {
                    const active = selectedSlot?.starts_at === slot.starts_at;
                    return (
                      <button
                        key={slot.starts_at}
                        type="button"
                        onClick={() => chooseSlot(slot)}
                        className={`h-11 rounded-xl border text-[13px] font-mono font-medium transition-all duration-200 shadow-sm ${
                          active
                            ? 'bg-[#F28BB6] border-[#F28BB6] text-white shadow-md shadow-[#F28BB6]/30 scale-[1.02]'
                            : 'bg-white border-[#E4E0EC] text-[#211F2E] hover:border-[#F28BB6] hover:bg-[#F28BB6]/5 hover:text-[#4B3B6B]'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {slotWarning && (
                <p className="text-xs text-[#B3402A] mt-2 font-medium flex items-center gap-1">
                  <span>⚠️</span> {slotWarning}
                </p>
              )}
            </div>

            <hr className="border-[#E4E0EC]/60" />

            {/* Reason */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4B3B6B] uppercase tracking-[0.15em] mb-2">
                Reason for Visit
              </label>
              <input
                type="text"
                placeholder="e.g. Regular Antenatal Checkup, Ultrasound"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#F8F7FA] border border-[#E4E0EC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B3B6B] focus:bg-white focus:ring-4 focus:ring-[#4B3B6B]/10 transition-all text-[#211F2E]"
              />
              <div className="flex flex-wrap gap-2 mt-2.5">
                {REASON_SUGGESTIONS.map((label) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => setReason(label)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all font-medium ${
                      reason === label
                        ? 'bg-[#4B3B6B] border-[#4B3B6B] text-white shadow-sm'
                        : 'bg-[#F8F7FA] border-[#E4E0EC] text-[#6B6578] hover:border-[#4B3B6B] hover:text-[#4B3B6B]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-[#4B3B6B] uppercase tracking-[0.15em] mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="Share any specific symptoms or concerns..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#F8F7FA] border border-[#E4E0EC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4B3B6B] focus:bg-white focus:ring-4 focus:ring-[#4B3B6B]/10 transition-all text-[#211F2E] resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#F28BB6] via-[#E8674F] to-[#CCA331] hover:opacity-95 text-white font-bold text-sm rounded-2xl shadow-xl shadow-[#F28BB6]/20 transition-all duration-200 disabled:opacity-50 active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Appointment...
                </span>
              ) : (
                'Confirm & Book Appointment'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingForm;