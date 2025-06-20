"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import contactUsImage from "@/assets/images/contact-us-bg.jpg";

const enquiryTypes = [
	{ value: "general", label: "General" },
	{ value: "support", label: "Support" },
	{ value: "sales", label: "Sales" },
];

const formSchema = z.object({
	enquiryType: z.string().min(1, "Enquiry type is required"),
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email"),
	phone: z.string().min(1, "Phone number is required"),
	dob: z.string().min(1, "Date of birth is required"),
	location: z.string().min(1, "Location is required"),
	comment: z.string().min(1, "Comment is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			enquiryType: "",
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			dob: "",
			location: "",
			comment: "",
		},
	});

	function onSubmit(values: FormValues) {
		// handle form submission
		console.log(values);
	}

	return (
		<div className="">
			<div
				style={{ backgroundImage: `url(${contactUsImage.src})` }}
				className="p-8 flex flex-col justify-center space-y-2 bg-cover h-80"
			>
				<h1 className="font-bold text-5xl">Contact Us</h1>
				<p className="text-2xl font-semibold max-w-2xl">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry.
				</p>
			</div>

			<div className=" flex items-center justify-center py-10">
				<div className="w-full bg-gray-100 p-8 rounded">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<div>
								<FormField
									control={form.control}
									name="enquiryType"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Enquiry Type</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger className="bg-white !h-14 w-full rounded-none">
														<SelectValue placeholder="Select your enquiry type..." />
													</SelectTrigger>
												</FormControl>
												<SelectContent className="bg-white">
													{enquiryTypes.map((type) => (
														<SelectItem key={type.value} value={type.value}>
															{type.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">First Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your first name..."
													className="rounded-none h-14 bg-white"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Last Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your last name..."
													className="rounded-none h-14 bg-white"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Email</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your email id..."
													type="email"
													className="rounded-none h-14 bg-white"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Phone Number</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your phone number..."
													className="rounded-none h-14 bg-white"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="dob"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Date of Birth</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your dob..."
													className="rounded-none h-14 bg-white"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="location"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">Your Location</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter your location..."
													className="rounded-none h-14 bg-white"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div>
								<FormField
									control={form.control}
									name="comment"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-lg">
												Enter Your Comment
											</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Enter your dob..."
													rows={4}
													className="rounded-none bg-white"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="flex justify-end">
								<Button type="submit" size="lg" className="w-52 h-14 text-xl">
									Send
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
