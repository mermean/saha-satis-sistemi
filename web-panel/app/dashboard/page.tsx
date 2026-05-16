"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Boxes,
  UserCog,
  Menu,
  X,
  LogOut,
  Wallet,
} from "lucide-react";

const menuItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "customers",
    title: "Müşteri Yönetimi",
    icon: Users,
  },
  {
    id: "products",
    title: "Ürün Yönetimi",
    icon: Package,
  },
  {
    id: "sales",
    title: "Satış",
    icon: ShoppingCart,
  },
  {
    id: "stock",
    title: "Stok Yönetimi",
    icon: Boxes,
  },
  {
  id: "balance",
  title: "Bakiye Yönetimi",
  icon: Wallet,
  },
  {
    id: "users",
    title: "Kullanıcı Yönetimi",
    icon: UserCog,
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
  const token =
    localStorage.getItem("token");

  if (!token) {
    router.push("/");
  }
}, []);
  const [customers, setCustomers] = useState<any[]>([]);
  const [todaySales, setTodaySales] =
  useState(0);
  const [balanceLogs, setBalanceLogs] = useState<any[]>([]);

  const [stockForm, setStockForm] =
  useState({
    productId: "",
    amount: "",
  });

  const [users, setUsers] = useState<any[]>([]);

const [showPasswords, setShowPasswords] =
  useState<{ [key: number]: boolean }>({});

const [userForm, setUserForm] = useState({
  name: "",
  email: "",
  password: "",
});

  const handleUserInput = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setUserForm({
    ...userForm,
    [e.target.name]: e.target.value,
  });
};
  const fetchUsers = async () => {
  try {
    const token = localStorage.getItem(
      "token"
    );

    const response = await fetch(
      "http://localhost:5000/api/auth/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setUsers(data);
  } catch (error) {
    console.log(error);
  }
};
const createUser = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(userForm),
      }
    );

    const data = await response.json();

    console.log(data);

    setUserForm({
      name: "",
      email: "",
      password: "",
    });

    fetchUsers();
  } catch (error) {
    console.log(error);
  }
};
  const handleStockInput = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  setStockForm({
    ...stockForm,
    [e.target.name]: e.target.value,
  });
};

const addStock = async () => {
  try {
    const token = localStorage.getItem(
      "token"
    );

    await fetch(
      `http://localhost:5000/api/products/stock`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          productId: Number(
            stockForm.productId
          ),

          amount: Number(
            stockForm.amount
          ),
        }),
      }
    );

    setStockForm({
      productId: "",
      amount: "",
    });

    fetchProducts();
  } catch (error) {
    console.log(error);
  }
};

  const [balanceForm, setBalanceForm] = useState({
    customerId: "",
    type: "ADD_BALANCE",
    amount: "",
    description: "",
  });

  const [selectedCustomer, setSelectedCustomer] =
  useState("");

  const [saleItems, setSaleItems] = useState<any[]>(
    []
  );

  const [salesHistory, setSalesHistory] =
  useState<any[]>([]);

const [showSalesHistory, setShowSalesHistory] =
  useState(false);

  const [saleForm, setSaleForm] = useState({
    productId: "",
    unit: "KILO",
    quantity: "",
    withVat: false,
  });



const [customerSearch, setCustomerSearch] =
  useState("");

const [editingCustomerId, setEditingCustomerId] =
  useState<number | null>(null);

const [customerForm, setCustomerForm] = useState({
  company: "",
  branch: "",
  balance: "",
  taxNumber: "",
  address: "",
});
  
  const [editingProductId, setEditingProductId] =
  useState<number | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    barcode: "",
    price: "",
    stock: "",
    category: "",
  });

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const createProduct = async () => {
  try {
    const token = localStorage.getItem("token");

    const url = editingProductId
      ? `http://localhost:5000/api/products/${editingProductId}`
      : "http://localhost:5000/api/products";

    const method = editingProductId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: productForm.name,
        barcode: productForm.barcode,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
        category: productForm.category,
      }),
    });

    setProductForm({
      name: "",
      barcode: "",
      price: "",
      stock: "",
      category: "",
    });

    setEditingProductId(null);

    fetchProducts();
  } catch (error) {
    console.log(error);
  }
};

const editProduct = (product: any) => {
  setEditingProductId(product.id);

  setProductForm({
    name: product.name,
    barcode: product.barcode,
    price: String(product.price),
    stock: String(product.stock),
    category: product.category,
  });
};


  const deleteProduct = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProducts();
  } catch (error) {
    console.log(error);
  }
};

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );


  const fetchCustomers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/customers",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setCustomers(Array.isArray(data) ? data : []);
  } catch (error) {
    console.log(error);
  }
};

const fetchBalanceLogs = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/balance",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setBalanceLogs(Array.isArray(data) ? data : []);
  } catch (error) {
    console.log(error);
  }
};


const handleBalanceInput = (
  e: React.ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement |
    HTMLSelectElement
  >
) => {
  setBalanceForm({
    ...balanceForm,
    [e.target.name]: e.target.value,
  });
};


const saveBalanceLog = async () => {
  try {
    const token = localStorage.getItem("token");

    await fetch(
      "http://localhost:5000/api/balance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerId: Number(balanceForm.customerId),
          type: balanceForm.type,
          amount: Number(balanceForm.amount),
          description: balanceForm.description,
        }),
      }
    );

    setBalanceForm({
      customerId: "",
      type: "ADD_BALANCE",
      amount: "",
      description: "",
    });

    fetchCustomers();
    fetchBalanceLogs();
  } catch (error) {
    console.log(error);
  }
};


const handleSaleInput = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  const { name, value, type } = e.target;

  setSaleForm({
    ...saleForm,
    [name]:
      type === "checkbox"
        ? (e.target as HTMLInputElement)
            .checked
        : value,
  });
};



const addSaleItem = () => {
  const product = products.find(
    (p) => p.id === Number(saleForm.productId)
  );

  if (!product) return;

  const quantity = Number(saleForm.quantity);

  let multiplier = 1;

  if (saleForm.unit === "TON") {
    multiplier = 1000;
  }

  if (saleForm.unit === "GRAM") {
    multiplier = 0.001;
  }

  if (saleForm.unit === "CUVAL") {
    multiplier = 50;
  }

  const total =
    product.price * quantity * multiplier;

  const vatAmount = saleForm.withVat
    ? total * 0.01
    : 0;

  const finalPrice = total + vatAmount;

  const newItem = {
    id: Date.now(),
    productId: product.id,
    productName: product.name,
    quantity,
    unit: saleForm.unit,
    unitPrice: product.price,
    totalPrice: finalPrice,
    withVat: saleForm.withVat,
  };

  setSaleItems([...saleItems, newItem]);

  setSaleForm({
    productId: "",
    unit: "KILO",
    quantity: "",
    withVat: false,
  });
};

const removeSaleItem = (id: number) => {
  setSaleItems(
    saleItems.filter((item) => item.id !== id)
  );
};

const completeSale = async () => {
  try {
    if (!selectedCustomer) {
      alert("Müşteri seç");

      return;
    }

    if (saleItems.length === 0) {
      alert("Satış listesi boş");

      return;
    }

    const token = localStorage.getItem(
      "token"
    );

    const response = await fetch(
      "http://localhost:5000/api/sales",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          customerId: Number(
            selectedCustomer
          ),

          items: saleItems,

          totalPrice: totalSalePrice,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      alert(data.message);

      return;
    }

    alert("Satış tamamlandı");

    setSaleItems([]);

    fetchCustomers();
    fetchBalanceLogs();
    fetchSalesHistory();
  } catch (error) {
    console.log(error);

    alert("Bir hata oluştu");
  }
};

const fetchSalesHistory = async () => {
  try {
    const token = localStorage.getItem(
      "token"
    );

    const response = await fetch(
      "http://localhost:5000/api/sales",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setSalesHistory(
      Array.isArray(data) ? data : []
    );
    const today = new Date().toDateString();

const todayTotal = data.reduce(
  (acc: number, sale: any) => {
    const saleDate = new Date(
      sale.createdAt
    ).toDateString();

    if (saleDate === today) {
      return acc + sale.totalPrice;
    }

    return acc;
  },
  0
);

setTodaySales(todayTotal);
  } catch (error) {
    console.log(error);
  }
};

const deleteSale = async (id: number) => {
  try {
    const token = localStorage.getItem(
      "token"
    );

    await fetch(
      `http://localhost:5000/api/sales/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchSalesHistory();
  } catch (error) {
    console.log(error);
  }
};


const totalSalePrice = saleItems.reduce(
  (acc, item) => acc + item.totalPrice,
  0
);

  const handleCustomerInput = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => {
  setCustomerForm({
    ...customerForm,
    [e.target.name]: e.target.value,
  });
};

  const saveCustomer = async () => {
  try {
    const token = localStorage.getItem("token");

    const url = editingCustomerId
      ? `http://localhost:5000/api/customers/${editingCustomerId}`
      : "http://localhost:5000/api/customers";

    const method = editingCustomerId
      ? "PUT"
      : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: customerForm.company,
        branch: customerForm.branch,
        balance: Number(customerForm.balance),
        taxNumber: customerForm.taxNumber,
        address: customerForm.address,
      }),
    });

    setCustomerForm({
      company: "",
      branch: "",
      balance: "",
      taxNumber: "",
      address: "",
    });

    setEditingCustomerId(null);

    fetchCustomers();
  } catch (error) {
    console.log(error);
  }
};

  const deleteCustomer = async (id: number) => {
  try {
    const token = localStorage.getItem("token");

    await fetch(
      `http://localhost:5000/api/customers/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchCustomers();
  } catch (error) {
    console.log(error);
  }
};


  const editCustomer = (customer: any) => {
  setEditingCustomerId(customer.id);

  setCustomerForm({
    company: customer.company,
    branch: customer.branch,
    balance: String(customer.balance),
    taxNumber: customer.taxNumber,
    address: customer.address,
  });
};
const logout = () => {
  localStorage.removeItem("token");

  router.push("/");
};

  const filteredCustomers = customers.filter(
  (customer) =>
    `${customer.company} ${customer.branch}`
      .toLowerCase()
      .includes(customerSearch.toLowerCase())
);

const deleteUser = async (id: number) => {
  try {
    const token = localStorage.getItem(
      "token"
    );

    const response = await fetch(
      `http://localhost:5000/api/auth/users/${id}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    fetchUsers();
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchProducts();
  fetchCustomers();
  fetchBalanceLogs();
  fetchSalesHistory();
  fetchUsers();
}, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <h1 className="text-4xl font-bold text-white mb-8">
              Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <p className="text-gray-400 text-sm mb-2">
                  KG
                </p>

                <h2 className="text-4xl font-bold text-white">
                  {products.length}
                </h2>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <p className="text-gray-400 text-sm mb-2">
                  Toplam Müşteri
                </p>

                <h2 className="text-4xl font-bold text-white">
                  {customers.length}
                </h2>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <p className="text-gray-400 text-sm mb-2">
                  Bugünkü Satış
                </p>

                <h2 className="text-4xl font-bold text-green-400">
                  ₺{todaySales.toLocaleString("tr-TR")}
                </h2>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <p className="text-gray-400 text-sm mb-2">
                  Kritik Stok
                </p>

                <h2 className="text-4xl font-bold text-red-400">
                  {
                    products.filter(
                      (product) => product.stock <= 10
                    ).length
                  }
                </h2>
              </div>
            </div>
          </div>
        );

      case "products":
        return (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Ürün Yönetimi
                </h1>

                <p className="text-gray-400">
                  Ürün ekle, ara ve yönet 
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Yeni Ürün Ekle
                </h2>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleInputChange}
                    placeholder="Ürün Adı"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
                  />

                  <input
                    type="text"
                    name="barcode"
                    value={productForm.barcode}
                    onChange={handleInputChange}
                    placeholder="Barkod"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
                  />

                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleInputChange}
                    placeholder="Fiyat"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
                  />

                  <input
                    type="number"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleInputChange}
                    placeholder="Stok"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
                  />

                  <input
                    type="text"
                    name="category"
                    value={productForm.category}
                    onChange={handleInputChange}
                    placeholder="Kategori"
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
                  />

                  <button
                    onClick={createProduct}
                    className="w-full bg-green-600 hover:bg-green-700 transition p-4 rounded-2xl text-white font-semibold"
                  >
                    {editingProductId ? "Ürünü Güncelle" : "Ürün Ekle"}
                  </button>
                </div>
              </div>

              <div className="xl:col-span-2 bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl overflow-x-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Ürün Listesi
                  </h2>

                  <input
                    type="text"
                    placeholder="Ürün ara"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none w-full md:w-80"
                  />
                </div>

                <table className="w-full text-left text-white">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-300">
                      <th className="p-4">Ürün</th>
                      <th className="p-4">Fiyat</th>
                      <th className="p-4">Stok</th>
                      <th className="p-4">Kategori</th>
                      <th className="p-4">İşlem</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="p-4 font-medium">
                          {product.name}
                        </td>

                        <td className="p-4 text-green-400">
                          ₺{product.price}
                        </td>

                        <td className="p-4">
                          {product.stock} KG
                        </td>

                        <td className="p-4">
                          {product.category}
                        </td>

                        <td className="p-4">

                            <button
                                onClick={() => editProduct(product)}
                                className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-xl text-black font-semibold mr-2"
                                >
                                Düzenle
                            </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl text-white font-semibold"
                          >
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredProducts.length === 0 && (
                  <div className="text-center text-gray-400 py-10">
                    Ürün bulunamadı
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "customers":
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Müşteri Yönetimi
          </h1>

          <p className="text-gray-400">
            Müşteri ekle, düzenle ve detaylarını görüntüle 
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Müşteri Bilgileri
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="company"
              value={customerForm.company}
              onChange={handleCustomerInput}
              placeholder="Kurum Adı"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <input
              type="text"
              name="branch"
              value={customerForm.branch}
              onChange={handleCustomerInput}
              placeholder="Şube Adı"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <input
              type="number"
              name="balance"
              value={customerForm.balance}
              onChange={handleCustomerInput}
              placeholder="Bakiye"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <input
              type="text"
              name="taxNumber"
              value={customerForm.taxNumber}
              onChange={handleCustomerInput}
              placeholder="Vergi Numarası"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <textarea
              name="address"
              value={customerForm.address}
              onChange={handleCustomerInput}
              placeholder="Adres Bilgileri"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none min-h-35 resize-none"
            />

            <button onClick={saveCustomer} className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl text-white font-semibold shadow-lg">
              {editingCustomerId
                ? "Müşteri Güncelle"
                : "Müşteri Kaydet"}
            </button>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="flex items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white">
              Müşteri Listesi
            </h2>

            <input
              type="text"
              placeholder="Müşteri ara"
              value={customerSearch}  
              onChange={(e) =>
                setCustomerSearch(e.target.value)
              }
              className="p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none w-72"
            />
          </div>

          <div className="space-y-4 max-h-175 overflow-auto pr-2">
            {filteredCustomers.map((customer) => (
              <details
                key={customer.id}
                className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden group"
              >
                <summary className="list-none cursor-pointer p-5 flex items-center justify-between hover:bg-white/5 transition">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {customer.company}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {customer.branch}
                    </p>
                  </div>

                  <div className="text-gray-400 group-open:rotate-180 transition">
                    ▼
                  </div>
                </summary>

                <div className="border-t border-white/10 p-5 bg-white/5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        Bakiye
                      </p>

                      <p className="font-semibold text-green-400">
                        ₺{customer.balance}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm mb-1">
                        Vergi No
                      </p>

                      <p className="font-semibold">
                        {customer.taxNumber}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-gray-400 text-sm mb-1">
                      Adres
                    </p>

                    <p className="text-white leading-7">
                      {customer.address}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => editCustomer(customer)}
                      className="bg-yellow-500 hover:bg-yellow-600 transition px-5 py-3 rounded-xl text-black font-semibold"
                    >
                      Düzenle
                    </button>

                    <button
                      onClick={() => deleteCustomer(customer.id)}
                      className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl text-white font-semibold"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

      case "sales":
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Satış Yönetimi
          </h1>

          <p className="text-gray-400">
            Satış oluştur ve ürün ekle
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* SOL PANEL */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Yeni Satış
          </h2>

          <div className="space-y-4">
            <select
              value={selectedCustomer}
              onChange={(e) =>
                setSelectedCustomer(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            >
              <option value="">
                Müşteri Seç
              </option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                  className="text-black"
                >
                  {customer.company} - {customer.branch}
                </option>
              ))}
            </select>

            <select
              name="productId"
              value={saleForm.productId}
              onChange={handleSaleInput}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            >
              <option value="">
                Ürün Seç
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                  className="text-black"
                >
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="quantity"
              value={saleForm.quantity}
              onChange={handleSaleInput}
              placeholder="Miktar"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <select
              name="unit"
              value={saleForm.unit}
              onChange={handleSaleInput}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            >
              <option
                value="KG"
                className="text-black"
              >
                KG
              </option>

              <option
                value="TON"
                className="text-black"
              >
                Ton
              </option>

              <option
                value="GRAM"
                className="text-black"
              >
                Gram
              </option>

              <option
                value="CUVAL"
                className="text-black"
              >
                Çuval
              </option>
            </select>

            <label className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                name="withVat"
                checked={saleForm.withVat}
                onChange={handleSaleInput}
              />

              KDV Ekle (%1)
            </label>

            <button
              onClick={addSaleItem}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl text-white font-semibold shadow-lg"
            >
              Satışa Ekle
            </button>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div className="xl:col-span-2 bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Satış Listesi
            </h2>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  console.log("tiklandi");
                  fetchSalesHistory();

                  setShowSalesHistory(
                    !showSalesHistory
                  );
                }}
                className="relative z-50 cursor-pointer bg-white/10 hover:bg-white/20 transition px-5 py-3 rounded-2xl text-white border border-white/10"              >
                Toplam Satışlar
              </button>

              <div className="text-3xl font-bold text-green-400">
                ₺
                {totalSalePrice.toLocaleString(
                  "tr-TR"
                )}
              </div>
            </div>
          </div>



                    {showSalesHistory && (
  <div className="mb-8 bg-black/20 border border-white/10 rounded-2xl p-5">
    <h2 className="text-2xl font-bold text-white mb-6">
      Tüm Satışlar
    </h2>

    <div className="space-y-4 max-h-100 overflow-auto">
      {salesHistory.map((sale) =>
        sale.items.map((item: any) => (
          <div
            key={item.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {sale.customer?.company ||
                    sale.customerName}{" "}
                  -{" "}
                  {sale.customer?.branch ||
                    sale.branchName}
                </h3>

                <p className="text-gray-300 mt-1">
                  {item.product?.name ||
                    item.productName}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  {item.quantity}{" "}
                  {item.unit}
                </p>
              </div>

              <div className="text-right">
                <button
                  onClick={() => deleteSale(sale.id)}
                  className="mt-3 text-red-400 hover:text-red-300 text-sm"
                >
                  Sil
                </button>
                <div className="text-green-400 text-xl font-bold">
                  ₺
                  {item.totalPrice.toLocaleString(
                    "tr-TR"
                  )}
                </div>

                <div className="text-gray-400 text-sm mt-2">
                  {new Date(
                    sale.createdAt
                  ).toLocaleString("tr-TR")}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)}

          


          <div className="space-y-4 max-h-175 overflow-auto pr-2">
            <button
              onClick={completeSale}
              className="w-full mb-6 bg-green-600 hover:bg-green-700 transition p-4 rounded-2xl text-white font-semibold shadow-lg"
            >
              Satışı Tamamla
            </button>
            {saleItems.map((item) => (
              <div
                key={item.id}
                className="bg-black/20 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {item.productName}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {item.quantity}{" "}
                      {item.unit}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">
                      ₺
                      {item.totalPrice.toLocaleString(
                        "tr-TR"
                      )}
                    </div>

                    <button
                      onClick={() =>
                        removeSaleItem(item.id)
                      }
                      className="text-red-400 text-sm mt-2 hover:text-red-300"
                    >
                      Sil
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  {item.withVat
                    ? "KDV Dahil"
                    : "KDV Hariç"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

      case "stock":
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Stok Yönetimi
          </h1>

          <p className="text-gray-400">
            Stoğa ürün ekle ve stokları yönet
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* SOL PANEL */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Stoğa Ürün Ekle
          </h2>

          <div className="space-y-4">
            <select
              name="productId"
              value={stockForm.productId}
              onChange={handleStockInput}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            >
              <option value="">
                Ürün Seç
              </option>

              {products.map((product) => (
                <option
                  key={product.id}
                  value={product.id}
                  className="text-black"
                >
                  {product.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              value={stockForm.amount}
              onChange={handleStockInput}
              placeholder="Eklenecek stok (KG)"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <button
              onClick={addStock}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl text-white font-semibold shadow-lg"
            >
              Stoğa Ekle
            </button>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div className="xl:col-span-2 bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Stok Listesi
          </h2>

          <div className="space-y-4 max-h-175 overflow-auto pr-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-black/20 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {product.name}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {product.category}
                    </p>
                  </div>

                  <div
                    className={`text-3xl font-bold ${
                      product.stock <= 10
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {product.stock} KG
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

      case "balance":
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Bakiye Yönetimi
          </h1>

          <p className="text-gray-400">
            Cari hareketleri ve tahsilat işlemleri
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Yeni Hareket
          </h2>

          <div className="space-y-4">
            <select
              name="customerId"
              value={balanceForm.customerId}
              onChange={handleBalanceInput}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            >
              <option value="">Müşteri Seç</option>

              {customers.map((customer) => (
                <option
                  key={customer.id}
                  value={customer.id}
                  className="text-black"
                >
                  {customer.company}
                </option>
              ))}
            </select>

            <select
              name="type"
              value={balanceForm.type}
              onChange={handleBalanceInput}
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            >
              <option
                value="ADD_BALANCE"
                className="text-black"
              >
                Bakiye Arttır
              </option>

              <option
                value="COLLECTION"
                className="text-black"
              >
                Bakiye Azalt
              </option>
            </select>

            <input
              type="number"
              name="amount"
              value={balanceForm.amount}
              onChange={handleBalanceInput}
              placeholder="Tutar"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <textarea
              name="description"
              value={balanceForm.description}
              onChange={handleBalanceInput}
              placeholder="Açıklama"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none min-h-32 resize-none"
            />

            <button
              onClick={saveBalanceLog}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl text-white font-semibold shadow-lg"
            >
              Hareket Kaydet
            </button>
          </div>
        </div>

        <div className="xl:col-span-2 bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Hareket Geçmişi
          </h2>



          <div className="space-y-4 max-h-175 overflow-auto pr-2">
            {balanceLogs.map((log) => (
              <div
                key={log.id}
                className="bg-black/20 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {log.customer?.company}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {log.description || "Açıklama yok"}
                    </p>
                  </div>

                  <div
                    className={`text-2xl font-bold ${
                      log.type === "COLLECTION"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {log.type === "COLLECTION"
                      ? "-"
                      : "+"}
                    ₺{log.amount}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                  <span>{log.type}</span>

                  <span>
                    {new Date(
                      log.createdAt
                    ).toLocaleString("tr-TR")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
      





        

      case "users":
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Kullanıcı Yönetimi
          </h1>

          <p className="text-gray-400">
            Yeni kullanıcı ekle ve kullanıcıları yönet
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* SOL PANEL */}
        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Yeni Kullanıcı
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleUserInput}
              placeholder="Kullanıcı adı"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <input
              type="email"
              name="email"
              value={userForm.email}
              onChange={handleUserInput}
              placeholder="E-posta"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <input
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleUserInput}
              placeholder="Şifre"
              className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 text-white outline-none"
            />

            <button
              onClick={createUser}
              className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl text-white font-semibold shadow-lg"
            >
              Kullanıcı Oluştur
            </button>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div className="xl:col-span-2 bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Kullanıcılar
          </h2>

          <div className="space-y-4 max-h-175 overflow-auto pr-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-black/20 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {user.name}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {user.email}
                    </p>

                    <p className="text-gray-500 text-sm mt-2">
                      Rol: {user.role}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-gray-300 text-sm">
                      {showPasswords[user.id]
                        ? user.plainPassword
                        : "••••••••"}
                    </div>

                    <button
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          [user.id]:
                            !showPasswords[
                              user.id
                            ],
                        })
                      }
                      className="mt-3 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      {showPasswords[user.id]
                        ? "Gizle"
                        : "Göster"}
                    </button>

                    <button
                    onClick={() =>
                      deleteUser(user.id)
                    }
                    className="mt-2 text-red-400 hover:text-red-300 text-sm block ml-auto"
                  >
                    Sil
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-black flex">
      <div
        className={`${
          sidebarOpen ? "w-72" : "w-24"
        } transition-all duration-300 bg-black/40 border-r border-white/10 backdrop-blur-xl p-4 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between mb-10">
            {sidebarOpen && (
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Saha Satış
                </h1>

                <p className="text-gray-400 text-sm mt-1">
                  Yönetim Paneli
                </p>
              </div>
            )}

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="bg-white/10 hover:bg-white/20 transition p-3 rounded-xl text-white"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div className="space-y-3">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={24} />

                  {sidebarOpen && (
                    <span className="font-medium text-left">
                      {item.title}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button  onClick={logout}  className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition">
          <LogOut size={24} />

          {sidebarOpen && <span>Çıkış Yap</span>}
        </button>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}