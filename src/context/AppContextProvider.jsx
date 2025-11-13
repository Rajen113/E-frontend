import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductContext";
import { CartProvider } from "./CartContext";
import { ToastProvider } from "./ToastContext";

export default function AppContextProvider({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
