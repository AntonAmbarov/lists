import { IDatabase } from "../types/shared/db";

export class MockData implements IDatabase {
    public cards: [
        {
            id: 1,
            title: "The Art of Programming",
            img: "https://example.com/image1.jpg",
            description: "A deep dive into algorithms and data structures.",
            author: "John Doe",
            status: "active",
            metadata: [
                ["tags", "programming"],
                ["date", "2023-10-15"]
            ]
        },
        {
            id: 2,
            title: "Web Development Basics",
            img: "https://example.com/image2.jpg",
            description: "Learn HTML, CSS, and JavaScript from scratch.",
            author: "Jane Smith",
            status: "active"
        },
        {
            id: 3,
            title: "Machine Learning for Beginners",
            img: "https://example.com/image3.jpg",
            description: "Introduction to ML concepts and Python implementations.",
            author: "Alan Turing",
            status: "active",
            metadata: [
                ["category", "AI"],
                ["version", "0.1"]
            ]
        },
        {
            id: 4,
            title: "The Future of Quantum Computing",
            img: "https://example.com/image4.jpg",
            description: "Exploring quantum algorithms and their potential.",
            author: "Richard Feynman",
            status: "active"
        },
        {
            id: 5,
            title: "Cybersecurity Essentials",
            img: "https://example.com/image5.jpg",
            description: "Protecting your systems from modern threats.",
            author: "Alice Johnson",
            status: "active"
        },
        {
            id: 6,
            title: "Design Patterns in OOP",
            img: "https://example.com/image6.jpg",
            description: "Common patterns for better software architecture.",
            author: "Erich Gamma",
            status: "active",
            metadata: [
                ["language", "Java"],
                ["pages", "384"]
            ]
        },
        {
            id: 7,
            title: "Mobile App Development",
            img: "https://example.com/image7.jpg",
            description: "Building cross-platform apps with Flutter.",
            author: "Bob Builder",
            status: "active"
        },
        {
            id: 8,
            title: "Blockchain Fundamentals",
            img: "https://example.com/image8.jpg",
            description: "Understanding decentralized technologies.",
            author: "Satoshi Nakamoto",
            status: "active"
        },
        {
            id: 9,
            title: "DevOps Handbook",
            img: "https://example.com/image9.jpg",
            description: "CI/CD, Docker, and Kubernetes explained.",
            author: "Gene Kim",
            status: "active",
            metadata: [
                ["edition", "2"],
                ["publisher", "IT Press"]
            ]
        },
        {
            id: 10,
            title: "Game Development with Unity",
            img: "https://example.com/image10.jpg",
            description: "Create your first 3D game from scratch.",
            author: "Unity Master",
            status: "active"
        }
    ]
}