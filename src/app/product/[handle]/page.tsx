import { ProductView } from "app/components/product/ProductView"
import { getProducts } from "app/services/shopify/products"
import { redirect } from "next/navigation"


interface ProductPageProps {
  searchParams: Promise<{
    id: string
  }>
}

export async function generateMetadata(props: ProductPageProps) {
  const searchParams = await props.searchParams;
  const id = searchParams.id
  const products = await getProducts(id)
  const product = products[0]

  return {
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: {
      images: [product.image]
    }
  }
}

export default async function ProductPage(props: ProductPageProps) {
  const searchParams = await props.searchParams;
  const id = searchParams.id
  const products = await getProducts(id)
  const product = products[0]

  if (!id) {
    redirect('/')
  }

  return <ProductView product={product} />
}