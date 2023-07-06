import { NextResponse } from 'next/server';

const meals = [
    {
        "id": "aasf",
        "title": "Röd curry",
        "author": "Klara"
    },
    {
        "id": "ghjkghjk",
        "title": "Stroganoff",
        "author": "Klara"
    },
    {
        "id": "xcvbxb",
        "title": "Broccolipaj",
        "author": "Klara"
    },
    {
        "id": "yuioyo",
        "title": "Spaghetti med köttfärssås",
        "author": "Klara"
    },
    {
        "id": "aasf",
        "title": "Ris med currysås och kyckling",
        "author": "Klara"
    },
    {
        "id": "mnbvxc",
        "title": "Falaffel med bröd",
        "author": "Klara"
    },
    {
        "id": "efgvfg",
        "title": "Tacos",
        "author": "Klara"
    }
]
 
export async function GET(request: Request) { 
    return NextResponse.json(meals);
}