'use client';

import { useState } from 'react';
import LaunchingSoonPopup from '@/components/ui/LaunchingSoonPopup';

export default function DemoPopupPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showAutoClose, setShowAutoClose] = useState(false);
  const [showNoClose, setShowNoClose] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-organic-50 to-makhana-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-makhana-700 to-organic-700 bg-clip-text text-transparent">
            Popup Banner Demo
          </span>
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Click the buttons below to see different popup variations
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Standard Popup */}
          <div className="bg-white rounded-xl shadow-soft p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Standard Popup</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Regular popup with close button and backdrop click to close
            </p>
            <button
              onClick={() => setShowPopup(true)}
              className="w-full py-3 bg-gradient-to-r from-makhana-600 to-organic-600 text-white font-medium rounded-lg hover:from-makhana-700 hover:to-organic-700 transition-all duration-300 transform hover:scale-105"
            >
              Show Popup
            </button>
          </div>
          
          {/* Auto-close Popup */}
          <div className="bg-white rounded-xl shadow-soft p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Auto-close Popup</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Popup that automatically closes after 3 seconds
            </p>
            <button
              onClick={() => setShowAutoClose(true)}
              className="w-full py-3 bg-gradient-to-r from-organic-600 to-makhana-600 text-white font-medium rounded-lg hover:from-organic-700 hover:to-makhana-700 transition-all duration-300 transform hover:scale-105"
            >
              Show Auto-close
            </button>
          </div>
          
          {/* No Close Button */}
          <div className="bg-white rounded-xl shadow-soft p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Modal Style</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Popup without close button (click backdrop or button to close)
            </p>
            <button
              onClick={() => setShowNoClose(true)}
              className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
            >
              Show Modal
            </button>
          </div>
        </div>
        
        {/* Code Preview */}
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
            <h3 className="text-white font-semibold">Usage Example</h3>
          </div>
          <div className="p-6">
            <pre className="text-sm bg-gray-50 rounded-lg p-4 overflow-x-auto">
{`import LaunchingSoonPopup from '@/components/ui/LaunchingSoonPopup';

// Basic usage
<LaunchingSoonPopup 
  isOpen={showPopup}
  onClose={() => setShowPopup(false)}
/>

// With auto-close
<LaunchingSoonPopup 
  isOpen={showAutoClose}
  onClose={() => setShowAutoClose(false)}
  autoClose={true}
  autoCloseDelay={3000}
/>

// Without close button
<LaunchingSoonPopup 
  isOpen={showNoClose}
  onClose={() => setShowNoClose(false)}
  showCloseButton={false}
/>`}
            </pre>
          </div>
        </div>
      </div>
      
      {/* Popups */}
      <LaunchingSoonPopup 
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
      />
      
      <LaunchingSoonPopup 
        isOpen={showAutoClose}
        onClose={() => setShowAutoClose(false)}
        autoClose={true}
        autoCloseDelay={3000}
      />
      
      <LaunchingSoonPopup 
        isOpen={showNoClose}
        onClose={() => setShowNoClose(false)}
        showCloseButton={false}
      />
    </div>
  );
}