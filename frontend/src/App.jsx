import { useState, useEffect } from "react";
import Entries from "./components/Entries";
import Filter from "./components/Filter";
import EntryForm from "./components/EntryForm";
import entryService from "./services/entry";
import Notification from "./components/Notification"


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  //Data fetching from json server using axios and Effect Hook
  useEffect(() => {
    // console.log("effect");
    entryService.getAll().then((response) => {
      // console.log("promise fulfilled");
      // console.log("response data", response)
      setPersons(response.data);
    });
  }, []);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (p) => {
    // display an alert to confirm deletion
    const confirmed = window.confirm(
      `Delete ${p.name} ?`
    );

    if (confirmed) {
      entryService
        .remove(p.id)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data);
            setPersons(persons.filter((person) => person.id !== p.id));
            setMessage(p.name + " Deleted Successfully");
            setTimeout(() => {
              setMessage(null)
            }, 3000);
          }
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Information of " + p.name + " has already been removed from server")
          setTimeout(() => {
            setMessage(null)
          }, 3000);
          // handle error
        });
    }
  };
  const handleSubmit = (event) => {
    //preventing default action of submitting HTML forms
    event.preventDefault();
    // checking if newName is already present in persons
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      const confirmed = window.confirm(
        ` ${newName} is already added to phonebook, replace the old number with a new number?`
      );
      if (confirmed) {
        const p = persons.filter((person) => person.name === newName)[0];
        entryService
          .update(p.id, personObject)
          .then((response) => {
            if (response.status === 200) {
              console.log(response.data);
              setPersons(persons.map(person => person.id !== p.id ? person : response.data))
              setMessage('Number changed successfully for ' + p.name)
              setTimeout(() => {
                setMessage(null)
              }, 3000);
              setNewName("");
              setNewNumber("");
            }

          })
          .catch((error) => {
            console.log(error.response.data.error);
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000);
          });
      }
    } else {
      console.log("form submitting");
      entryService.create(personObject).then((response) => {
        if (response.status === 200) {
          setPersons(persons.concat(response.data));
          setMessage(response.data.name + ' Added Successfully')
          setTimeout(() => {
            setMessage(null)
          }, 3000);
          setNewName("");
          setNewNumber("");
        }

      })
        .catch((error) => {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000);
        });
    }
  };
  //for implementing search query
  //creating state variable to hold search query
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  // filtering the names with search query
  const filteredPersons = persons?.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" >
      <Notification
        emsg={errorMessage}
        message={message}
      />
      <div className="left-container">
        <h2>Phonebook</h2>




        <h2>Add New Contact Number</h2>

        <EntryForm
          submitHandle={handleSubmit}
          newName={newName}
          newNumber={newNumber}
          handleNewName={handleNewName}
          handleNewNumber={handleNewNumber}
        />
      </div>
      <div className="right-container">
        <Filter
          searchHandle={handleSearchChange}
          searchQuery={searchQuery}
        />
        <h2>Saved Numbers</h2>
        {filteredPersons.map((person) => (
          <Entries key={person.id} person={person} onDelete={handleDelete} />
        ))}
      </div>


    </div>
  );
};

export default App;