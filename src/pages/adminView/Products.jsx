import ProductImageUpload from "@/components/admin-view/ImageUpload";
import Form from "@/components/comman/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {  addNewProduct, deleteProduct, editProduct, fetchProducts } from './../../store/admin/product-slice/index';
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";


const initialState = {
  image: null,
  title: "",
  description: "",
  price: "",
  brand: "",
  category: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductDailog, setOpenCreateProductDailog] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.AdminProduct);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
  
    // Check if we are in edit mode
    if (currentEditedId !== null) {
      // Dispatch the edit action
      dispatch(editProduct({
        id: currentEditedId,
        formData
      })).then((data) => {
        console.log(data,"data");
        console.log("Edit Product Response:", data); // Debugging line
        if (data?.payload?.status) {
          dispatch(fetchProducts());
          setOpenCreateProductDailog(false);
          setCurrentEditedId(null);
          setFormData(initialState);
          setImageFile(null);
          setUploadedImageURL('');
          toast({
            title: `${data?.payload?.message}`,
          });
        } else {
          // Handle error case if needed
          toast({
            title: "Failed to update product",
            description: data?.payload?.message || "An error occurred.",
          });
        }
      }).catch((error) => {
        // Handle any errors that occurred during the dispatch
        console.error("Error updating product:", error);
        toast({
          title: "Error",
          description: error.message || "An error occurred while updating the product.",
        });
      });
    } else {
      // Dispatch the add new product action
      dispatch(
        addNewProduct({
          ...formData,
          image: uploadedImageURL, // Include the uploaded image URL
        })
      ).then((data) => {
        
        
        if (data?.payload?.success) {
          dispatch(fetchProducts());
          setOpenCreateProductDailog(false);
          setImageFile(null);
          setFormData(initialState);
          setCurrentEditedId(null); // Reset the edited ID
          toast({
            title: `${data?.payload?.message}`,
          });
        } else {
          // Handle error case if needed
          toast({
            title: "Failed to add product",
            description: data?.payload?.message || "An error occurred.",
          });
        }
      });
    }
  }

  function handleDelete(getProductId) {
    console.log(getProductId);
    dispatch(deleteProduct({ id: getProductId })).then((data) => {
        if (data?.payload?.status) {
            dispatch(fetchProducts());
            toast({
                title: `${data?.payload?.message}`,
            });
        } else {
            // Handle the error case
            toast({
                title: 'Error deleting product',
                description: data?.payload?.error || 'An error occurred',
                status: 'error',
            });
        }
    }).catch((error) => {
        // Handle any unexpected errors
        console.error('Error deleting product:', error);
        toast({
            title: 'Error deleting product',
            description: 'An unexpected error occurred',
            status: 'error',
        });
    });
}
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Determine if the form should be disabled
  const isEditMode = currentEditedId !== null;
  const isFormDisabled = !isEditMode && !uploadedImageURL; // Disable if not in edit mode and no image uploaded

  return (
    <Fragment>
      <div className="mb-5 flex w-full justify-end">
        <Button onClick={() => setOpenCreateProductDailog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0 ? (
          productList.map((productItem) => (
            <AdminProductTile
              key={productItem._id}
              setFormData={setFormData}
              setCurrentEditedId={setCurrentEditedId}
              setOpenCreateProductDailog={setOpenCreateProductDailog}
              product={productItem}
              handleDelete={handleDelete}

            />
          ))
        ) : (
          <h2 className="text-red-500 text-xl">Don't have any product 😩😔</h2>
        )}
      </div>
      <Sheet
        open={openCreateProductDailog}
        onOpenChange={(open) =>{
           setOpenCreateProductDailog(open)
           setCurrentEditedId(null)
           setFormData(initialState)
          }}
      >
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>
              <h2 className="text-lg font-bold">
                {currentEditedId ? "Edit Product" : "Create Product"}
              </h2>
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setUploadedImageURL={setUploadedImageURL}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            isEditMode={isEditMode} // Pass edit mode state
          />
          <div className="py-6">
            <Form
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId ? "Update" : "Add"}
              onSubmit={onSubmit}
              disabled={isFormDisabled} // Disable based on the new logic
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}


export default AdminProducts;
