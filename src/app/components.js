'use client';

import { useEffect, useState } from 'react';
import { Dropdown } from 'flowbite';

const Button = ({ label, className, onClick }) => (
  <button
    onClick={onClick}
    className={`block text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
  >
    {label}
  </button>
);

const DropdownMenu = ({ triggerId, dropdownId, items }) => {
  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window !== 'undefined') {
      const triggerEl = document.getElementById(triggerId);
      const dropdownEl = document.getElementById(dropdownId);

      if (triggerEl && dropdownEl) {
        // Initialize Flowbite dropdown only if the elements exist
        new Dropdown(dropdownEl, triggerEl);
      }
    }
  }, [triggerId, dropdownId]);

  return (
    <div>
      <button
        id={triggerId}
        data-dropdown-toggle={dropdownId}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center"
      >
        Dropdown
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div id={dropdownId} className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
        <ul className="py-2 text-sm text-gray-700" aria-labelledby={triggerId}>
          {items.map((item, index) => (
            <li key={index}>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const ModalComponent = ({ isOpen, size, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center items-center bg-black bg-opacity-50 h-screen"
    >
      <div className={`relative w-full ${size === 'small' ? 'max-w-md' : size === 'medium' ? 'max-w-lg' : 'max-w-4xl'} max-h-full`}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg w-8 h-8"
            onClick={onClose}
          >
            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0 6 6M7 7L1 1"></path>
            </svg>
          </button>
          <div className="p-6 text-center">
            <h3 className="mb-5 text-lg font-normal">{content}</h3>
            <Button label="Close" className="bg-red-600 hover:bg-red-800" onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ToastNotification = ({ id, message, type, show }) => {
  if (!show) return null;

  const toastTypeClass = {
    success: 'text-green-500 bg-green-100',
    danger: 'text-red-500 bg-red-100',
    warning: 'text-orange-500 bg-orange-100',
  };

  return (
    <div
      id={id}
      className={`fixed flex items-center w-full max-w-xs p-4 mb-4 bottom-5 left-5 text-gray-500 bg-white rounded-lg shadow ${toastTypeClass[type]}`}
    >
      <div className={`inline-flex items-center justify-center w-8 h-8 ${toastTypeClass[type]} rounded-lg`}>
        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
    </div>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState('medium');
  const [toastData, setToastData] = useState({ show: false, type: '', message: '' });

  const showToast = (type, message) => {
    setToastData({ show: true, type, message });
    setTimeout(() => setToastData({ show: false }), 3000); // Auto close toast after 3 seconds
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Component Showcase</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button label="Default Button" className="bg-blue-500 hover:bg-blue-700" />
            <Button label="Rounded Button" className="bg-green-500 hover:bg-green-700 rounded-full" />
            <Button label="Shadow Button" className="bg-red-500 hover:bg-red-700 shadow-lg" />
            <Button label="Outlined Button" className="bg-yellow-500 hover:bg-yellow-700 border-2 border-yellow-700" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Dropdowns</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <DropdownMenu
              triggerId="dropdownDefault"
              dropdownId="dropdown"
              items={['Dashboard', 'Settings', 'Earnings', 'Sign out']}
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Popups</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button label="Small Modal" className="bg-blue-700" onClick={() => { setIsModalOpen(true); setModalSize('small'); }} />
            <Button label="Medium Modal" className="bg-blue-700" onClick={() => { setIsModalOpen(true); setModalSize('medium'); }} />
            <Button label="Large Modal" className="bg-blue-700" onClick={() => { setIsModalOpen(true); setModalSize('large'); }} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Toast Notifications</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button label="Show Success Toast" className="bg-green-500" onClick={() => showToast('success', 'Item moved successfully.')} />
            <Button label="Show Danger Toast" className="bg-red-500" onClick={() => showToast('danger', 'Item has been deleted.')} />
            <Button label="Show Warning Toast" className="bg-yellow-500" onClick={() => showToast('warning', 'This is a warning toast.')} />
          </div>
        </section>

        <ModalComponent
          isOpen={isModalOpen}
          size={modalSize}
          onClose={() => setIsModalOpen(false)}
          content={`This is a ${modalSize} modal.`}
        />

        <ToastNotification
          id="toast"
          message={toastData.message}
          type={toastData.type}
          show={toastData.show}
        />
      </div>
    </div>
  );
}