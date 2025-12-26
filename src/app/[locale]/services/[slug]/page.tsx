
import { notFound } from "next/navigation"
import { servicesData } from "@/lib/services-data"
import { ServiceDetail } from "@/components/service-detail"

interface PageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const service = servicesData[slug as keyof typeof servicesData]

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} - Bitcore Solution`,
    description: service.description,
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = servicesData[slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  return <ServiceDetail service={service} slug={slug} />
}
