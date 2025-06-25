import axiosInstance from "../../api/axiosInstance";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

import PageMeta from "../../components/common/PageMeta";

import ProductsTable from "../../components/tables/ProductsTable/ProductsTable";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../../types/Products";
import toast from "react-hot-toast";

export default function Products() {
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get<{
        message: string;
        success: boolean;
        data: Product[];
      }>("/api/v1/products");
      console.log(response.data.data);
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return (
    <>
      <PageMeta
        title="React.js Profile Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Profile Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Products" />

      <div className="space-y-6">
        {data && (
          <ProductsTable
            data={data}
            isError={isError}
            isLoading={isLoading}
            error={error}
          />
        )}{" "}
      </div>
    </>
  );
}
