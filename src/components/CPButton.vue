<script setup lang="ts">
/**
 * Stylized button with Cyberpunk-themed notch styling.
 */
</script>

<style>
.notchbtn_cont {
    overflow: hidden;
    position: relative;
    background-color: red;
    padding: 2px 3px 2px 3px;
    height: calc(1.5em + 4px);
}


.notchbtn_cont:after {
    content: "";
    position: absolute;
    top: calc(-1.5em + 2px);
    left: calc(-2em);
    width: 2em;
    height: 3em;
    background-color: white;
    transform: rotate(45deg);

}

.notchbtn {
    overflow: hidden;
    height: 1.5em;
    position: relative;
}


.notchbtn:before {
    content: "";
    position: absolute;
    top: -1em;
    left: -2em;
    width: 2em;
    height: 2em;
    background-color: red;
    transform: rotate(45deg);

}
</style>
<template>
    <button class="notchbtn_cont">
        <div class=" notchbtn bg-red-100 text-sm font-bold text-black active:bg-red-800 hover:bg-red-500 hover:text-white px-2 ">
            <slot>Click Me!</slot>
        </div>
    </button>
</template>
