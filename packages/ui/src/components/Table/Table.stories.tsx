import { type Meta } from "@storybook/react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./"

const meta = {
  title: "Components/Table",
  component: Table,
} satisfies Meta<typeof Table>

export default meta

const invoices = [
  { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
  { invoice: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
  { invoice: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
]

export const Base = () => (
  <Table>
    <TableCaption>A list of your recent invoices.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Invoice</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Method</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {invoices.map((invoice) => (
        <TableRow key={invoice.invoice}>
          <TableCell className="font-medium">{invoice.invoice}</TableCell>
          <TableCell>{invoice.status}</TableCell>
          <TableCell>{invoice.method}</TableCell>
          <TableCell className="text-right">{invoice.amount}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$1,750.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
)

export const WithFooter = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Product</TableHead>
        <TableHead className="text-right">Qty</TableHead>
        <TableHead className="text-right">Price</TableHead>
        <TableHead className="text-right">Total</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Pro Plan</TableCell>
        <TableCell className="text-right">3</TableCell>
        <TableCell className="text-right">$29.00</TableCell>
        <TableCell className="text-right">$87.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className="font-medium">Storage Add-on</TableCell>
        <TableCell className="text-right">1</TableCell>
        <TableCell className="text-right">$9.00</TableCell>
        <TableCell className="text-right">$9.00</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Subtotal</TableCell>
        <TableCell className="text-right font-semibold">$96.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
)

const people = [
  { name: "Lindsay Walton", title: "Front-end Developer", email: "lindsay@example.com" },
  { name: "Courtney Henry", title: "Designer", email: "courtney@example.com" },
  { name: "Tom Cook", title: "Director of Product", email: "tom@example.com" },
]

export const Minimal = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Title</TableHead>
        <TableHead>Email</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {people.map((person) => (
        <TableRow key={person.email}>
          <TableCell className="font-medium">{person.name}</TableCell>
          <TableCell>{person.title}</TableCell>
          <TableCell>{person.email}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)
