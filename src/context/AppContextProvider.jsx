import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import { ToastProvider } from "./ToastContext";
import { AdminProvider } from "./AdminContext";

export default function AppContextProvider({ children }) {
  return (
    <>
    <AuthProvider>
       <AdminProvider> 
      <ProductProvider>
        <CartProvider>
          <ToastProvider>

            {children}
          </ToastProvider>
        </CartProvider>
      </ProductProvider>
        </AdminProvider>
      </AuthProvider>

   
   
    </>
  );
}
