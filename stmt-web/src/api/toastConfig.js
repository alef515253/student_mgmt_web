export const toastOptions = {
    position: "top-right",    // Position of the toast
    autoClose: 5000,          // Auto close after 5 seconds
    hideProgressBar: false,   // Show the progress bar
    closeOnClick: true,       // Close the toast on click
    pauseOnHover: true,       // Pause auto close when hovered
    draggable: true,          // Allow toast to be draggable
    progress: undefined,      // Undefined initial progress
    type: "default",          // Default type (can be overridden)
    theme: "colored",         // Colored theme
    icon: true,               // Show icon (can customize or set to false)
    toastId: null,            // Optional unique identifier
    rtl: false,               // Right-to-left layout for languages like Arabic
    style: {                  // Custom inline styles
      backgroundColor: '#fff',
      color: '#333',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '8px',
    },
    className: "custom-toast",   // Custom CSS class for the toast
    bodyClassName: "custom-toast-body",  // Custom CSS class for the toast body
    progressClassName: "custom-toast-progress", // Custom CSS class for the progress bar
  };