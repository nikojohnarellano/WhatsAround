var isExecuting = false;

/**
 * Toggles the navigation flag
 * @private
 */
function toggle() {
    isExecuting = false;
}

/**
 * Adds a delay for the function to stop it getting executed twice.
 * @private
 */
function safeExecute(func) {
    let args = Array.prototype.slice.call(arguments, 1);

    if (!isExecuting) {
        isExecuting = true;
        func(...args);
        setTimeout(toggle, 800);
    }
}

export default safeExecute;
