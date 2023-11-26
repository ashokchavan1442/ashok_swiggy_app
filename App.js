const heading= React.createElement("h1" ,{className:"className"}, "Hello world from React!");
        const root=ReactDOM.createRoot(document.getElementById("root"));
        console.log(heading);
        root.render(heading);