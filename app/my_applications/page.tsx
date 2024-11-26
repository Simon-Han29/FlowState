import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import Navbar from "@/components/Navbar";
const My_applications = () => {
    const jobApplications = [
        {
            id: 1,
            company: "Google",
            position: "Software Engineer",
            status: "Applied",
        },
        {
            id: 2,
            company: "Amazon",
            position: "Frontend Developer",
            status: "Interview Scheduled",
        },
        {
            id: 3,
            company: "Meta",
            position: "Backend Developer",
            status: "Rejected",
        },
    ];
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex justify-center items-center">
                <Card className="w-[85%]">
                    <CardHeader>
                        <CardTitle>Job Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date Applied</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {jobApplications.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell>{job.id}</TableCell>
                                        <TableCell>{job.company}</TableCell>
                                        <TableCell>{job.position}</TableCell>
                                        <TableCell>{job.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default My_applications;
