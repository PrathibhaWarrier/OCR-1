<td>
          <input
            type="checkbox"
            id={`stationCheck${i}`}
            name={`stationCheck${i}`}
            value={`optionChecked${i}`}
            onChange={() => handleCheckboxChange(i)}
            checked={stationCheckStates[i]}
          />
          <label htmlFor={`stationCheck${i}`}>Option</label>
        </td>
