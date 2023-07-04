// These are function for index.html
function toCompPage(){
    window.open("computing.html");
}
function toArtPage(){
    window.open("artworks.html");
}
function toFilmPage(){
    window.open("films.html");
}
function toMusicPage(){
    window.open("musics.html");
}
function toPhotoPage(){
    window.open("photo.html");
}
function toBlogPage(){
    window.open("blogs.html");
}


// Scripts for artworks.html
let count = 0
let list = ["gallery/DSC0E0456.jpeg","gallery/DSC0E0457.jpeg","gallery/DSC0E0458.jpeg","gallery/DSC0E0459.jpeg","gallery/DSC0E0461.jpeg"
    ,"gallery/DSC0E0462.jpeg", "gallery/DSC0E0463.jpeg", "gallery/DSC0E0464.jpeg", "gallery/DSC0E0466.jpeg"]
let size = list.length-1
function initialize(){

    let text = document.getElementById("textarea")
    text.value = "She was a phantom of delight\n" +
        "When first she gleamed upon my sight;\n" +
        "A lovely apparition, sent\n" +
        "To be a moment's ornament;\n" +
        "Her eyes as stars of twilight fair;\n" +
        "Like twilight's, too, her dusky hair;\n" +
        "But all things else about her drawn\n" +
        "From May-time and the cheerful dawn;\n" +
        "A dancing shape, an image gay,\n" +
        "To haunt, to startle, and waylay.\n" +
        "\n" +
        "I saw her upon nearer view,\n" +
        "A spirit, yet a woman too!\n" +
        "Her household motions light and free,\n" +
        "And steps of virgin liberty;\n" +
        "A countenance in which did meet\n" +
        "Sweet records, promises as sweet;\n" +
        "A creature not too bright or good\n" +
        "For human nature's daily food;\n" +
        "For transient sorrows, simple wiles,\n" +
        "Praise, blame, love, kisses, tears, and smiles.\n" +
        "\n" +
        "And now I see with eye serene\n" +
        "The very pulse of the machine;\n" +
        "A being breathing thoughtful breath,\n" +
        "A traveler between life and death;\n" +
        "The reason firm, the temperate will,\n" +
        "Endurance, foresight, strength, and skill;\n" +
        "A perfect woman, nobly planned,\n" +
        "To warn, to comfort, and command;\n" +
        "And yet a spirit still, and bright,\n" +
        "With something of an angel light.\n\n"+
        "- William Wordsworth"


}
function next(){
    if (count < size) {
        count++
        document.getElementById("image").src = list[count];
        document.getElementById("count").innerHTML = (count+1)+"/"+(size+1)
    }
    else{
        document.getElementById("image").src = list[0];
        count = 0
        document.getElementById("count").innerHTML = (count+1)+"/"+(size+1)
    }
}
function back(){
    if (count > 0) {
        count--
        document.getElementById("image").src = list[count];
        document.getElementById("count").innerHTML = (count+1)+"/"+(size+1)
    }
    else{
        document.getElementById("image").src = list[size];
        count = size
        document.getElementById("count").innerHTML = (count+1)+"/"+(size+1)
    }
}



