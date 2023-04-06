const { useState, useEffect } = require('react');

/**
 *
 * @param {String} value
 * @param {Number} delay
 */
const useDebounce = (value, delay) => {
    const [debouncedValue, setdebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setdebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};

export default useDebounce;
