"use client"
import React, { useState, useEffect } from 'react';

interface Journi {
    content: string;
    createdAt: string; // Assuming a string representation of a date
    username: string;
}

function JourniApp() {
    const [journiEntry, setJourniEntry] = useState<string>('');
    const [journis, setJournis] = useState<Journi[]>([]);

    useEffect(() => {
        // Retrieve journis from local storage
        const storedJournis = localStorage.getItem('journis');
        if (storedJournis) {
            const parsedJournis = JSON.parse(storedJournis) as Journi[];
            setJournis(parsedJournis.sort((a, b) => {
                const timestampA = new Date(a.createdAt).getTime(); // Get timestamp as a number
                const timestampB = new Date(b.createdAt).getTime();
                return timestampB - timestampA; // Now you can subtract numerical timestamps
            }));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate character limit
        if (journiEntry.length > 500) {
            alert('Journi entries can only be 500 characters or less.');
            return;
        }

        // Create new journi object with timestamp
        const newJourni: Journi = {
            content: journiEntry,
            createdAt: new Date().toISOString(),
            username: 'Your Name', // Assuming a placeholder username
        };

        // Update journis state and local storage
        setJournis([newJourni, ...journis]);
        localStorage.setItem('journis', JSON.stringify(journis));

        // Clear input field
        setJourniEntry('');
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
                <textarea
                    value={journiEntry}
                    onChange={(e) => setJourniEntry(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 focus:ring focus:ring-blue-500 mb-4"
                    placeholder="What's on your mind?"
                    maxLength={500}
                />
                <div className="text-right text-sm text-gray-500 mb-2">{500 - journiEntry.length} characters remaining</div>
                <button type="submit" className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600">
                    Post Journi
                </button>
            </form>

            <div className="flex flex-row w-full">
                <div className="w-full md:w-3/4">
                    {journis.map((journi) => (
                        <div key={journi.content} className="border-b-2 mb-4 p-10 space-y-4 flex flex-col">
                            {/* Journi content without rounded corners */}
                            <div className="flex items-center">
                                <img src="https://i.pravatar.cc/150?u=someuniqueid" alt="Placeholder" className="rounded-full w-10 h-10 mr-4" />
                                <div>
                                    <p className="font-bold">{journi.username}</p>
                                    <p className="text-sm text-gray-500">{new Date(journi.createdAt).toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="break-words">{journi.content}</p>
                        </div>
                    ))}
                </div>
                <div className="hidden md:w-1/4 px-4">
                    {/* Additional content for larger screens */}
                </div>
            </div>
        </div>
    );
}

export default JourniApp;
