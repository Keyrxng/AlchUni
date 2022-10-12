// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ChainBattles is ERC721URIStorage {
    using Strings for uint256;
    using Strings for uint8;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => CharStats) public tokenIdToStats;

    struct CharStats {
        uint8 level;
        uint8 speed;
        uint8 strength;
        uint8 life;
    }

    CharStats[] public charStats;

    constructor() ERC721("Chain Battles", "CBTLS") {}

    function generateChar(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Warrior",
            "</text>",
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Level: ",
            getLevels(_tokenId),
            "</text>",
            '<text x="30%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Speed: ",
            getSpeeds(_tokenId),
            "</text>",
            '<text x="65%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Strength: ",
            getStrengths(_tokenId),
            "</text>",
            '<text x="80%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Life: ",
            getLifes(_tokenId),
            "</text>",
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getLevels(uint256 _tokenId) public view returns (string memory) {
        CharStats memory stats = tokenIdToStats[_tokenId];
        return stats.level.toString();
    }

    function getSpeeds(uint256 _tokenId) public view returns (string memory) {
        CharStats memory stats = tokenIdToStats[_tokenId];
        return stats.speed.toString();
    }

    function getStrengths(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        CharStats memory stats = tokenIdToStats[_tokenId];
        return stats.strength.toString();
    }

    function getLifes(uint256 _tokenId) public view returns (string memory) {
        CharStats memory stats = tokenIdToStats[_tokenId];
        return stats.life.toString();
    }

    function getTokenUri(uint256 _tokenId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "Chain Battles #',
            _tokenId.toString(),
            '",',
            '"description": "Battles on chain",',
            '"image": "',
            generateChar(_tokenId),
            '"',
            "}"
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        CharStats memory char = CharStats(1, 1, 1, 1);
        charStats.push(char);
        tokenIdToStats[newItemId] = char;
        _setTokenURI(newItemId, getTokenUri(newItemId));
    }

    function train(uint256 _tokenId) public {
        require(_exists(_tokenId), "ID doesn't exist");
        require(ownerOf(_tokenId) == msg.sender, "non-ownership");
        CharStats storage stats = tokenIdToStats[_tokenId];
        uint8 currentLvl = stats.level;
        stats.level = currentLvl + 1;
        uint8 currentSpd = stats.speed;
        stats.speed = currentSpd + 1;
        uint8 currentStr = stats.strength;
        stats.strength = currentStr + 1;
        uint8 currentLife = stats.life;
        stats.life = currentLife + 1;

        _setTokenURI(_tokenId, getTokenUri(_tokenId));
    }
}
