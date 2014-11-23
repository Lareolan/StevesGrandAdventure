/// <reference path="../lib/jquery.d.ts" />

/**
 * This file contains the class that handles the raw data for the game's various entities such
 * as Steve, mobs, torches, exit doors, etc...
 * Author:              Konstantin Koton
 * Filename:            MapEntities.ts
 * Last Modified By:    Konstantin Koton
 * Date Last Modified:  Nov. 22, 2014
 * Revision History:    Too numerous to mention
 */
module GameObjects {
    // Mapentities class
    export class MapEntities {
        // An array to hold all the raw entity information
        entityList: Array<Object>;

        /*
         * The constructor takes in a jQuery object containing and array of raw entities
         * in XML format, reorganizes it and stores it in an iternal array.
         */
        constructor($entityGroup) {
            var $entities = $entityGroup.find("object");
            var entityList = this.entityList = [];

            $entities.each(function () {
                var $this = $(this);
                var obj = {};

                var attributes = $this[0].attributes;
                for (var index = 0; index < attributes.length; index++) {
                    var attribute = attributes[index];
                    obj[attribute.name] = attribute.value;
                }

                entityList.push(obj);
            });
        }

        /*
         * Retrieves a single entity Object by it's name.
         * @param entityName A string containing the name of entity to retrieve
         * @returns An entity Object
         */
        getEntityByName(entityName: string): Object {
            for (var index = 0; index < this.entityList.length; index++) {
                if (this.entityList[index]["name"] === entityName) {
                    return this.entityList[index];
                }
            }
            return null;
        }

        /*
         * Retrieve an array of entity Objects based on their type.
         * @param entityType A string containing the type of entity to get
         * @returns An array of entity objects
         */
        getEntitiesByType(entityType: string): Array<Object> {
            var entityList: Array<Object> = null;

            for (var index = 0; index < this.entityList.length; index++) {
                if (this.entityList[index]["type"] === entityType) {
                    if (!entityList) {
                        entityList = [];
                    }
                    entityList.push(this.entityList[index]);
                }
            }
            return entityList;
        }

        // Returns the array of all the entity Objects.
        getAllEntities(): Array<Object> {
            return this.entityList;
        }
    }
} 