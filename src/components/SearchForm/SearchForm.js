import React from "react";
import TextField from "@material-ui/core/TextField";
import { fade, InputAdornment } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";

const autocompleteService = { current: null };
const geocoder = { current: null };

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2)
    },
    inputTextField: {
        color: "inherit",
        backgroundColor: fade(theme.palette.common.white, 0.55),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.75)
        },
        borderRadius: theme.shape.borderRadius
    }
}));

export function SearchForm({ firebase, queryIncidents }) {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);

    const handleChange = event => {
        setInputValue(event.target.value);
    };

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(request, callback);
            }, 200),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
            geocoder.current = new window.google.maps.Geocoder();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === "") {
            setOptions([]);
            return undefined;
        }

        fetch({ input: inputValue }, results => {
            if (active) {
                setOptions(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetch]);

    const onPlaceSelected = (event, value) => {
        if (value) {
            geocoder.current.geocode({ placeId: value.place_id }, (results, status) => {
                if (status === "OK") {
                    // console.log(value);
                    // console.log(results);
                    // const location = results[0].geometry.location;
                    console.log(
                        `(${results[0].geometry.location.lat()}, ${results[0].geometry.location.lng()})`
                    );

                    queryIncidents(
                        results[0].geometry.location.lat(),
                        results[0].geometry.location.lng(),
                        2,
                        firebase
                    );
                }
            });
        }
    };

    return (
        <Autocomplete
            id="google-map-demo"
            style={{ width: 300 }}
            getOptionLabel={option => (typeof option === "string" ? option : option.description)}
            onChange={onPlaceSelected}
            filterOptions={x => x}
            options={options}
            autoComplete
            includeInputInList
            renderInput={params => {
                params.InputProps.startAdornment = (
                    <InputAdornment position="start">
                        <SearchIcon></SearchIcon>
                    </InputAdornment>
                );

                return (
                    <TextField
                        {...params}
                        // label="Add a location"
                        variant="outlined"
                        fullWidth
                        onChange={handleChange}
                        className={classes.inputTextField}
                        placeholder="location, e.g. Shinjuku"
                    />
                );
            }}
            renderOption={option => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map(match => [match.offset, match.offset + match.length])
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}
