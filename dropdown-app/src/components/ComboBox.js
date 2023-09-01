//Tarde mucho en hacer todo esto, el hacerlo me ayudo mucho a crecer en conocimiento y muchas horas de estudio.
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/lab/Autocomplete';
import { TextField, CircularProgress, Dialog, DialogTitle, DialogContent } from '@mui/material';

const ComboBox = () => {
  const [isComboOpen, setComboOpen] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const isLoading = isComboOpen && optionList.length === 0;
  //Zona del dialogo
    const [dialogVisibility, setDialogVisibility] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    // Aqui simule firebase por que no poseo esos conocimiento aun :(
    const peopleData = {
        Emilia: {
           nombre: "Emilia",
          razon_social: "Emilia SOP iT.",
          nit: "123456789",
          codigo: "EMI001",
          telefono: "890-4324"
        },
        Lucas: {
            nombre: "Lucas",
            razon_social: "Prototype.",
            nit: "987654321",
            codigo: "LUC001",
            telefono: "456-6757"
        },
        Mikel: {
            nombre: "Mikel",
            razon_social: "Mikel y Suite.",
            nit: "246813579",
            codigo: "MIK001",
            telefono: "657-5676"
        },
        Luis: {
            nombre: "Luis",
            razon_social: "Luis Tecno.",
            nit: "135792468",
            codigo: "LUI001",
            telefono: "578-7986"
        }
    };

    useEffect(() => {
        if (!isLoading) return;
        setTimeout(() => {
            const namesFromFirebase = ["Emilia", "Lucas", "Mikel", "Luis"];
            const filteredNames = namesFromFirebase.filter(item => 
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setOptionList(filteredNames);
        }, 1000);
    }, [isLoading, searchTerm]);

    useEffect(() => {
        if (!isComboOpen) {
            setOptionList([]);
        }
    }, [isComboOpen]);

    const onSelectItem = (event, selectedItem) => {
        if (selectedItem) {
            setSelectedPerson(peopleData[selectedItem]);
            setDialogVisibility(true);
        }
    };

return (
   <div>
        <Autocomplete
          id="combo-box"
          open={isComboOpen}
          onOpen={() => setComboOpen(true)}
          onClose={() => setComboOpen(false)}
          inputValue={searchTerm}
          onInputChange={(event, newTerm) => {
          setSearchTerm(newTerm);
      }}
        onChange={onSelectItem}
        getOptionSelected={(option, value) => option === value}
        getOptionLabel={(option) => option}
        options={optionList}
        loading={isLoading}
        renderInput={(params) => (
            <TextField
              {...params}
              label="Buscar"
              variant="outlined"
              InputProps={{
              ...params.InputProps,
              endAdornment: (
          <div>
                 {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
          </div>
        ),
          }}
        />
      )}
  />

    <Dialog open={dialogVisibility} onClose={() => setDialogVisibility(false)}>
          <DialogTitle>Detalle de {selectedPerson?.nombre}</DialogTitle>
          <DialogContent>
                Nombre: {selectedPerson?.nombre} <br />
                Razón Social: {selectedPerson?.razon_social} <br />
                NIT: {selectedPerson?.nit} <br />
                Código: {selectedPerson?.codigo} <br />
                Teléfono: {selectedPerson?.telefono}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ComboBox;



