"use client";
import { Fade } from "react-awesome-reveal";

interface BookingConfirmationProps {
  roomType: string;
  onClose: () => void;
}

const BookingConfirmation = ({
  roomType,
  onClose,
}: BookingConfirmationProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <Fade direction="up" triggerOnce>
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Booking Request Sent!</h2>
            <p className="text-gray-600 mb-4">
              {`    Thank you for choosing ${roomType}. We've opened WhatsApp for you to confirm your booking.`}
            </p>
            <p className="text-gray-600 mb-6">
              Please complete the booking confirmation process through WhatsApp.
              Our team will respond to you shortly.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-pink text-white rounded-md hover:bg-pink/90"
            >
              Close
            </button>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default BookingConfirmation;
