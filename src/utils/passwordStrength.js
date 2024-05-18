// passwordStrength.js
export const getProgress = (password) => {
    const length = password.length;
    if (length === 0) return 0;
    if (length >= 8) return 1;
    return length / 8;
};

export const getColor = (password) => {
    const length = password.length;
    if (length === 0) return '#D3D3D3'; 
    if (length <= 4) return '#FF0000'; 
    if (length <= 7) return '#FFA500'; 
    return '#00FF00';
};
