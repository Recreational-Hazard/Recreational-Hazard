<svelte:head>
  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7wX2mEL12Y6Uvi4P2XWBHNxiRpUEMyDo&libraries=places&callback=initMap&solution_channel=GMP_QB_addressselection_v1_cAC"
    async
    defer></script>
  <script>
    ("use strict");

    function initMap() {
      const componentForm = ["region", "city", "area", "address", "appartment"];
      const autocompleteInput = document.getElementById("region");
      const autocomplete = new google.maps.places.Autocomplete(
        autocompleteInput,
        {
          fields: ["address_components", "geometry", "name"],
          types: ["address"],
        }
      );

      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
        fillInAddress(place);
      });

      function fillInAddress(place) {
        // optional parameter
        const addressNameFormat = {
          street_number: "short_name",
          route: "long_name",
          locality: "long_name",
          administrative_area_level_1: "short_name",
          country: "long_name",
          postal_code: "short_name",
        };

        const getAddressComp = function (type) {
          for (const component of place.address_components) {
            if (component.types[0] === type) {
              return component[addressNameFormat[type]];
            }
          }
          return "";
        };

        document.getElementById("region").value =
          getAddressComp("street_number") + " " + getAddressComp("route");
        for (const component of componentForm) {
          // Location field is handled separately above as it has different logic.
          if (component !== "region") {
            document.getElementById(component).value =
              getAddressComp(component);
          }
        }
      }
    }
  </script>
</svelte:head>

<div class="card-container">
  <div class="panel">
    <input
      class="form-control rounded-0 my-2"
      type="text"
      placeholder="Region"
      id="region"
    />
    <input
      class="form-control rounded-0 my-2"
      type="text"
      placeholder="City"
      id="city"
    />
    <input
      class="form-control rounded-0 my-2"
      type="text"
      placeholder="Area"
      id="area"
    />
    <input
      class="form-control rounded-0 my-2"
      type="text"
      placeholder="Address"
      id="address"
    />
    <input
      class="form-control rounded-0 my-2"
      type="text"
      placeholder="Apartment (optional)"
      id="appartment"
    />

    <button class="btn btn-primary rounded-0">Save Address</button>
  </div>
</div>

<!--
    Copyright 2021 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
  -->
<style>
  .card-container {
    display: flex;
    height: 500px;
    width: 300px;
  }

  .panel {
    background: white;
    width: 300px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
</style>
