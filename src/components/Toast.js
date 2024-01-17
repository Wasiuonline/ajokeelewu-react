import toast from 'react-hot-toast';

const SuccessToast = (message) => {
    toast.success((t) => ( message ),{
            style: {
                background: '#333',
                color: '#fff',
              },
              iconTheme: {
                primary: '#090',
                secondary: '#fff',
              },
              duration: 4000,
        });
        
}

export const ErrorToast = (message) => {
    toast.error((t) => ( message ),{
            style: {
                background: '#ddd',
                color: '#111',
              },
              iconTheme: {
                primary: '#f11',
                secondary: '#fff',
              },
              duration: 4000,
        });
        
}


export default SuccessToast;