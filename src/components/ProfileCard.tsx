import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function ProfileCard() {
  return (
    <Card className="w-sm h-196 bg-gray-50">
      <CardHeader className="p-4 bg-white">
        <CardTitle className="text-lg font-medium ">Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 ">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Marry Doe" />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center">
              <Check className="h-3 w-3 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900">Marry Doe</h3>
            <p className="text-sm text-gray-600">Marry@Gmail.Com</p>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-600 leading-relaxed">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et
          Dolore Magna Aliquyam Erat, Sed Diam
        </p>
      </CardContent>
    </Card>
  )
}
