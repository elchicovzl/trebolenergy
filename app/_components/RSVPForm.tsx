"use client";

import { useState } from "react";
import { MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { strings } from "@/app/lib/strings";
// import { submitRSVP } from '../actions/submitRSVP';
import { useToast } from "@/hooks/use-toast";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accompany, setAccompany] = useState("1");
  const [attendance, setAttendance] = useState("yes");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("accompany", accompany);
    formData.append("attendance", attendance);

    console.log(formData, "formData");

    // const result = await submitRSVP(formData);

    // if (result.success) {
    //   toast({
    //     title: "Success",
    //     description: strings.thankYouMessage,
    //   })
    //   // Reset form
    //   setName('');
    //   setEmail('');
    //   setAccompany('1');
    //   setAttendance('yes');
    //   setErrors({});
    // } else {
    //   toast({
    //     title: "Error",
    //     description: result.message,
    //     variant: "destructive",
    //   })
    //   if (result.errors) {
    //     setErrors(result.errors);
    //   } else {
    //     toast({
    //       title: "Error",
    //       description: result.message,
    //       variant: "destructive",
    //     })
    //   }
    // }
  };

  const openGoogleMaps = () => {
    const encodedLocation = encodeURIComponent(strings.eventLocation);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank');
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">{strings.title}</h1>
      <p className="mb-6">{strings.description}</p>
      <div className="mb-6">
        <Label>{strings.eventDateLabel}</Label>
        {/* <p className="text-lg font-semibold">
          {new Date(strings.eventDate).toLocaleDateString()}
        </p> */}
        <Calendar
          mode="single"
          selected={new Date(strings.eventDate)}
          className="rounded-md border flex flex-col items-center"
          fromDate={new Date(strings.eventDate)}
          toDate={new Date(strings.eventDate)}
          defaultMonth={new Date(strings.eventDate)}
          ISOWeek
        />
            <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={openGoogleMaps}
            className="w-full"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {strings.viewOnMapButton}
          </Button>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">{strings.nameLabel}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">{strings.emailLabel}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="accompany">{strings.accompanyLabel}</Label>
          <Input
            id="accompany"
            type="number"
            min="1"
            value={accompany}
            onChange={(e) => setAccompany(e.target.value)}
            required
          />
          {errors.accompany && (
            <p className="text-red-500 text-sm mt-1">{errors.accompany[0]}</p>
          )}
        </div>
        <div>
          <Label>{strings.rsvpLabel}</Label>
          <RadioGroup value={attendance} onValueChange={setAttendance}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">{strings.yesOption}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">{strings.noOption}</Label>
            </div>
          </RadioGroup>
          {errors.attendance && (
            <p className="text-red-500 text-sm mt-1">{errors.attendance[0]}</p>
          )}
        </div>
        <Button type="submit">{strings.submitButton}</Button>
      </form>
    </div>
  );
}
