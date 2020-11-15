const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const book = document.getElementById("book");
const textblock = document.getElementById("text");

/* const books = [
  "To Kill a Mockingbird",
  "Pride and Prejudice",
  "Jane Eyre",
  "The Great Gatsby",
  "Lor of the Flies",
  "Birdsong: A Novel of Love and War",
  "1984",
  "Brave new World",
  "Diary of a Young Girl",
]; */

let books = [
  {
    id: 0,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    published: "1960",
  },
  {
    id: 1,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    published: "1813",
  },
  {
    id: 2,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    published: "1925",
  },
  {
    id: 3,
    title: "Lord of the Flies",
    author: "William Golding",
    published: "1954",
  },
  {
    id: 4,
    title: "Birdsong: A Novel of Love and War",
    author: "Sebastian Faulks",
    published: "1993",
  },
  {
    id: 5,
    title: "1984",
    author: "George Orwell",
    published: "1949",
  },
  {
    id: 6,
    title: "Brave New World",
    author: "Aldous Huxley",
    published: "1932",
  },
  {
    id: 7,
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    published: "1947",
  },
  {
    id: 8,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    published: "1939",
  },
  {
    id: 9,
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    published: "1890",
  },
  {
    id: 10,
    title: "Wuthering Heights",
    author: "Emily Brontë",
    published: "1847",
  },
  {
    id: 11,
    title: "The Quiet American",
    author: "Graham Greene",
    published: "1955",
  },
  {
    id: 12,
    title: "The Bell Jar",
    author: "Slyvia Plath",
    published: "1963",
  },
  {
    id: 13,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    published: "1951",
  },
  {
    id: 14,
    title: "A passage to Inida",
    author: "E.M.Forster",
    published: "1924",
  },
  {
    id: 15,
    title: "Catch-22",
    author: "Joseph Heller",
    published: "1961",
  },
  {
    id: 16,
    title: "The War of The Worlds",
    author: "H.G. Wells",
    published: "1898",
  },
  {
    id: 17,
    title: "Frankenstein",
    author: "Mary Shelley",
    published: "1818",
  },
  {
    id: 18,
    title: "Life of Pi",
    author: "Yann Martel",
    published: "2001",
  },
  {
    id: 19,
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    published: "1844",
  },
  {
    id: 20,
    title: "The Wind in the Willows",
    author: "Kenneth Grahame",
    published: "1908",
  },
  {
    id: 21,
    title: "The Curious Incident of the Dog in the Night-Time",
    author: "Mark Haddon",
    published: "2003",
  },
  {
    id: 22,
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    published: "1899",
  },
  {
    id: 23,
    title: "Memoirs of a Geisha",
    author: "Arthur Golden",
    published: "1997",
  },
  {
    id: 24,
    title: "Robinson Crusoe",
    author: "Daniel Defoe",
    published: "1719",
  },
  {
    id: 25,
    title: "Rebecca",
    author: "Daphne du Maurier",
    published: "1938",
  },
  {
    id: 26,
    title: "Money",
    author: "Martin Amis",
    published: "1984",
  },
  {
    id: 27,
    title: "Ulysses",
    author: "James Joyce",
    published: "1922",
  },
  {
    id: 28,
    title: "A Bend in the River",
    author: "V.S Naipaul",
    published: "1979",
  },
  {
    id: 29,
    title: "The Way We Live Now",
    author: "Anthony Trollope",
    published: "1875",
  },
  {
    id: 30,
    title: "The Canterbury Tales",
    author: "Geoffrey Chaucer",
    published: "1400",
  },
  {
    id: 31,
    title: "Hamlet",
    author: "William Shakespeare",
    published: "1603",
  },
];

//update total and count
function updateSelectedCount() {
  //Get the parent element of the p tags to be removed
  let parentNode = document.querySelector(".text-box");
  //Get the nodes p tags by class
  let childNodes = document.querySelectorAll(".book-list");

  for (let i = 0; i < childNodes.length; i++) {
    let childNode = childNodes[i];
    //take the specific node and remove it from the dom
    parentNode.removeChild(childNode);
  }

  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  for (i = 0; i < seatsIndex.length; i++) {
    //Great the HTML Element
    const element = document.createElement("p");
    element.classList.add("book-list");
    element.innerHTML = `<strong>${books[seatsIndex[i]].title} by ${
      books[seatsIndex[i]].author
    } Published in ${books[seatsIndex[i]].published}</strong>`;
    textblock.appendChild(element);
  }

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
}
//Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

//Seat click event
container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

//Intial count and total and total set
