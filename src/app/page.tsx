import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the "Sobre Mim" page
  redirect("/hero")
}
